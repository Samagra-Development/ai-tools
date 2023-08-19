import os
import dsp
from transformers import GPT2Tokenizer
from dsp.utils import deduplicate


openai_key = os.getenv("OPENAI_API_KEY")


class DSP():
    def __init__(self):
        self.lm = dsp.GPT3(model='gpt-3.5-turbo-16k', api_key=openai_key, model_type='chat')
        self.sbert_reranker = dsp.SentenceTransformersCrossEncoder("cross-encoder/ms-marco-MiniLM-L-12-v2")

        self.tokenizer = GPT2Tokenizer.from_pretrained("gpt2-medium")

        self.qa_template_with_CoT = None
        self.rewrite_template = None
        self.hop_template = None
        self.train = None
        self.__generate_templates()

    def __call__(self, server: str, hf_model: str, question: str, train) -> str:
        self.rm = dsp.ColBERTv2(url=server)
        try:
            self.lm = dsp.HFModel(hf_model)
        except:
            self.lm = dsp.GPT3(model=hf_model, api_key=openai_key, model_type='chat')
        dsp.settings.configure(lm=self.lm, rm=self.rm, reranker=self.sbert_reranker)
        self.train = train
        return self.multihop_QA_v2(question), self.lm.inspect_history(n=3)

    def __generate_templates(self):
        Question = dsp.Type(prefix="Question:", desc="${the question to be answered}")
        Answer = dsp.Type(prefix="Answer:", desc="${a crisp and concise answer without redundant information}", format=dsp.format_answers)

        qa_template = dsp.Template(instructions="Answer questions with concise answers without redundant information.", question=Question(), answer=Answer())

        Rationale = dsp.Type(
            prefix="Rationale: Let's think step by step.",
            desc="${a step-by-step deduction that identifies the correct response, which will be provided below}"
        )
        
        self.qa_template_with_CoT = dsp.Template(
            instructions=qa_template.instructions,
            context=Context(), question=Question(), rationale=Rationale(), answer=Answer()
        )
        
        Context = dsp.Type(
            prefix="Context:\n",
            desc="${sources that may contain relevant content}",
            format=dsp.passages2text
        )
        
        SearchRationale = dsp.Type(
            prefix="Rationale: Let's think step by step. To answer this question, we first need to find out",
            desc="${the missing information}"
        )
        
        SearchQuery = dsp.Type(
            prefix="Search Query:",
            desc="${a simple question for seeking the missing information}"
        )
        
        self.rewrite_template = dsp.Template(
            instructions="Write a search query that will help answer a complex question.",
            question=Question(), rationale=SearchRationale(), query=SearchQuery()
        )

        CondenseRationale = dsp.Type(
            prefix="Rationale: Let's think step by step. Based on the context, we have learned the following.",
            desc="${information from the context that provides useful clues}"
        )
        
        self.hop_template = dsp.Template(
            instructions=self.rewrite_template.instructions,
            context=Context(), question=Question(), rationale=CondenseRationale(), query=SearchQuery()
        )

        True_Answer = dsp.Type(prefix="The correct answer: ", desc="${The true answer}")
        Predicted_Answer = dsp.Type(prefix="Another answer: ", desc="${The answer to compare to}")
        Resp = dsp.Type(prefix="Response: ", desc="${True (or) False}")

        self.answer_match_template = dsp.Template(
            instructions="Return True if the essence of both answers are same else return False. Respond with only 'True' and 'False'.",
            true_answer=True_Answer(), predicted_answer=Predicted_Answer(), response=Resp()
        )

    def __answer_match(self, true_ans, pred_ans):
        match_example = dsp.Example(true_answer=true_ans, predicted_answer=pred_ans, demos=[])
        _, completions = dsp.generate(self.answer_match_template)(match_example, stage='answer_match')
        return completions[0].response
    
    def __count_tokens(self, text):
        tokens = self.tokenizer.encode(text, return_tensors="pt")[0]
        return len(tokens)

    @dsp.transformation
    def QA_predict(self, example: dsp.Example, sc=True, return_store=False):
        temp = str(example)
        if sc:
            example, completions = dsp.generate(self.qa_template_with_CoT, n=20, temperature=0.7)(example, stage='qa')
            completions = dsp.majority(completions)
        else:
            example, completions = dsp.generate(self.qa_template_with_CoT)(example, stage='qa')
    
        if return_store:
            len_tokens = self.__count_tokens(temp)
            store = {
                "question": example.question,
                "context": example.context,
                "rationale": completions[0].rationale,
                "len_tokens": len_tokens
            }
            return example.copy(answer=completions.answer), store
        return example.copy(answer=completions.answer)

    @dsp.transformation
    def multihop_search_v1(self, example: dsp.Example, max_hops=2, k=2) -> dsp.Example:
        example.context = []
    
        for hop in range(max_hops):
            # Generate a query based
            template = self.rewrite_template if hop == 0 else self.hop_template
            example, completions = dsp.generate(template)(example, stage=f'h{hop}')

            # Retrieve k results based on the query generated
            passages = dsp.retrieve(completions.query, k=k)

            # Update the context by concatenating old and new passages
            example.context = deduplicate(example.context + passages)

        return example

    @dsp.transformation
    def multihop_attempt(self, d: dsp.Example) -> dsp.Example:
        # Prepare unaugmented demonstrations for the example.
        x = dsp.Example(question=d.question, demos=dsp.all_but(self.train, d))
    
        # Search. 
        # Annotate demonstrations for multihop_search_v2 with the simpler multihop_search_v1 pipeline.
        x = self.multihop_search_v1(x)
    
        # Predict. And skip examples where predict fails.
        x = self.QA_predict(x, sc=False)
        if not self.__answer_match(x.answer, d.answer) == "True": return None
    
        return d.copy(**x)

    @dsp.transformation
    def multihop_demonstrate(self, x: dsp.Example) -> dsp.Example:
        demos = dsp.sample(self.train, k=7)
        x.demos = dsp.annotate(self.multihop_attempt)(demos, k=3, return_all=True)
        return x

    @dsp.transformation
    def multihop_search_v2(self, example: dsp.Example, max_hops=2, k=5) -> dsp.Example:
        example.context = []
        store = []
        
        for hop in range(max_hops):
            # Generate queries
            template = self.rewrite_template if hop == 0 else self.hop_template

            len_tokens = self.__count_tokens(str(example))
            example, completions = dsp.generate(template, n=10, temperature=0.7)(example, stage=f'h{hop}')
        
            # Collect the queries and search with result fusion
            queries = [c.query for c in completions] + [example.question]
            example.context = dsp.retrieveEnsemble(queries, k=k)

            # Arrange the passages for the next hop
            if hop > 0:
                example.context = [completions[0].rationale] + example.context

            store.append({
                "question": queries,
                "rationale": completions[0].rationale,
                "context": example.context,
                "len_tokens": len_tokens
            })
    
        return example, store

    def multihop_QA_v2(self, question: str) -> str:
        x = dsp.Example(question=question)
        x = self.multihop_demonstrate(x)
        x, stores = self.multihop_search_v2(x)
        x, store = self.QA_predict(x, return_store=True)
        stores.append(store)
        return x.answer, stores