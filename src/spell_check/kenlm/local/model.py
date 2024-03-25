import kenlm  
from request import ModelRequest
import Levenshtein

model_paths = {
    'ory': '5gram_model.bin',
    'eng': '5gram_model_eng.bin'
}

vocab_paths = {
    'ory': 'lexicon.txt',
    'eng': 'lexicon_eng.txt'
}


class TextCorrector:
    def __init__(self, model_paths, vocab_paths):
        # Initialize both models and vocabularies
        self.models = {
            'ory': kenlm.Model(model_paths['ory']),
            'eng': kenlm.Model(model_paths['eng'])
        }
        self.vocabs = {
            'ory': self.create_vocab_lexicon(vocab_paths['ory']),
            'eng': self.create_vocab_lexicon(vocab_paths['eng'])
        }
        # Set the default language
        self.set_language('ory')

    def set_language(self, lang):
        # Switch the model and vocabulary based on language
        self.model = self.models[lang]
        self.vocab = self.vocabs[lang]

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
    def __init__(self, context, model_paths, vocab_paths):
        self.context = context
        self.text_corrector = TextCorrector(model_paths, vocab_paths)

    async def inference(self, request: ModelRequest):
        # Set the correct language model based on the request
        self.text_corrector.set_language(request.lang)

        corrected_text = self.text_corrector.correct_text_with_beam_search(
            request.text,
            BEAM_WIDTH=request.BEAM_WIDTH,
            SCORE_THRESHOLD=request.SCORE_THRESHOLD,
            max_distance=request.max_distance
        )
        return corrected_text
