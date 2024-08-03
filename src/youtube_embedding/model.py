from request import Modelrequest
from ragatouille import RAGPretrainedModel
from chunking import TranscriptChunker



class Model():
    def __new__(cls,context):
        cls.context=context 
        if not hasattr(cls,'instance'):
            cls.instance= super(Model,cls).__new__(cls)
        model_name="colbert-ir/colbertv2.0"
        cls.model=RAGPretrainedModel.from_pretrained(model_name)
            
        return cls.instance 

    async def inference(self,request:Modelrequest):

        url=request.url 
        query=request.query
        trasncript_data=request.transcript_data
        transcript_path=request.transcript_path 
        
        #chunking 
        chunker=TranscriptChunker()
        chunker.fit(transcript_path)
        chunked_data=chunker.chunks()
        chunked_meta_data=chunker.metadata()

        #embeddings and index creation
        RAG_DICT={}
        for chunks in chunked_data.keys():
            text_data=" "
            for data in chunked_data[chunks]:
                text_data=text_data+" "+data['text']

            RAG_DICT[chunks]=text_data

        RAG_DATA=[]
        for chunks in RAG_DATA.keys():
            RAG_DATA.append(RAG_DATA[chunks])

        index_path=self.model.index(index_name="my-index",collection=RAG_DATA)

        #query 
        RAG=RAGPretrainedModel.from_index(index_path)
        response=RAG.search(query)


        return response