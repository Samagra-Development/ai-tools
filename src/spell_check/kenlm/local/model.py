import kenlm  # Assuming you have this library installed
from request import ModelRequest
import Levenshtein

model_path = '5gram_model.bin'
vocab_path = 'lexicon.txt'

class TextCorrector:
    def __init__(self, model_path, vocab_path):
        self.model = kenlm.Model(model_path)
        self.vocab = self.create_vocab_lexicon(vocab_path)

    def create_vocab_lexicon(self, lexicon_path):
        vocabulary = []
        with open(lexicon_path, 'r', encoding='utf-8') as file:
            for line in file:
                word = line.split()[0]
                vocabulary.append(word)
        return vocabulary

    def generate_candidates(self, word, max_distance=1):
        len_range = range(len(word) - max_distance, len(word) + max_distance + 1)
        filtered_vocab = [vocab_word for vocab_word in self.vocab if len(vocab_word) in len_range]
        return [vocab_word for vocab_word in filtered_vocab if 0 <= Levenshtein.distance(word, vocab_word) <= max_distance]

    def beam_search(self, chunk, BEAM_WIDTH=5, SCORE_THRESHOLD=1.5, max_distance=1):
        original_score = self.model.score(' '.join(chunk))
        
        initial_candidates = self.generate_candidates(chunk[0], max_distance=1)
        if not initial_candidates:
            initial_candidates = [chunk[0]]

        beam = [{'sentence': candidate, 'score': self.model.score(candidate)} for candidate in initial_candidates]
        beam = sorted(beam, key=lambda x: x['score'], reverse=True)[:BEAM_WIDTH]

        for word in chunk[1:]:
            candidates = self.generate_candidates(word, max_distance=1)
            if not candidates:
                candidates = [word]

            new_beam = []

            for candidate in candidates:
                for beam_sentence in beam:
                    new_sentence = beam_sentence['sentence'] + ' ' + candidate
                    is_valid = all([1 >= Levenshtein.distance(w1, w2) for w1, w2 in zip(new_sentence.split(), chunk)])
                    if is_valid:
                        score = self.model.score(new_sentence)
                        new_beam.append({'sentence': new_sentence, 'score': score})

            beam = sorted(new_beam, key=lambda x: x['score'], reverse=True)[:BEAM_WIDTH]

        if (beam[0]['score'] - original_score) < SCORE_THRESHOLD:
            return ' '.join(chunk)

        return beam[0]['sentence']

    def correct_text_with_beam_search(self, text, BEAM_WIDTH=5, SCORE_THRESHOLD=1.5, max_distance=1):
        words = text.split()
        corrected_sentences = []

        chunks = [words[i:i + 5] for i in range(0, len(words), 5)]
        
        for chunk in chunks:
            best_sentence = self.beam_search(chunk, BEAM_WIDTH, SCORE_THRESHOLD, max_distance)
            corrected_sentences.append(best_sentence)

        return ' '.join(corrected_sentences)

class Model():
    def __init__(self, context):
        self.context = context
        self.text_corrector = TextCorrector(model_path, vocab_path)

    async def inference(self, request: ModelRequest):
        corrected_text = self.text_corrector.correct_text_with_beam_search(
            request.text,
            BEAM_WIDTH=request.BEAM_WIDTH,
            SCORE_THRESHOLD=request.SCORE_THRESHOLD,
            max_distance=request.max_distance
        )
        return corrected_text