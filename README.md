Youtube_Audio_Transcripts_Using_VectorDB
Youtube_transcripts
Description
Possess the ability to parse every video on a YouTube channel or playlist, extract audio transcripts, and embed the videos in a vector database so that search and retrieval are possible.

Implementation Details
It will consist of the following:

Get the user's playlist or channel link.
Take audio clips out of every video in the playlist or link.
Take out the timestamps and transcripts from each video.
Make chunks from the transcript (you may use any fancy chunking algorithm or just use basic chunks like four minutes of audio).
Use an LLM call to summarise each video, then save each chunk separately.
Use COLBERT to embed this in a vector database (Ragatoullie - LangChain). Make use of this as a guide.
Turn on COLBERT retrieval and search for the embedded information.
A search for a question returns obtain the necessary content's timestamps, a YouTube link, and similar content.
Product Name
AI Tools

Organization Name
SamagraX

Domain
NA

Tech Skills Needed
Pytorch/ Python, ML

Category
Feature

Mentor(s)
@GautamR-Samagra

Complexity
Medium

Code Setup: Make sure you have Python installed.