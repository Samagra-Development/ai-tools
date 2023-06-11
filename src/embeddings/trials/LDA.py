import gensim
from gensim.corpora import Dictionary
from gensim.models import LdaModel
import PyPDF2


def extract_text(filepath):
    with open(filepath, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in range(len(pdf_reader.pages)):
            temp_text = pdf_reader.pages[page].extract_text()
            print(temp_text)
            text+= pdf_reader.pages[page].extract_text()
    return text

def clean_text(text):
    # Customize this method based on your specific cleaning requirements
    cleaned_text = text.replace('\n', ' ').replace('\r', '')
    # Clean the text and remove punctuation
    return cleaned_text

extracted_text = extract_text("cgt.pdf")
cleaned_text = clean_text(extracted_text)

# print("(............................................................)")

# print(cleaned_text)
# Preprocess the text and convert it into a list of sentences
text = cleaned_text

sentences = [sentence.strip() for sentence in text.split('.') if sentence.strip()]

# Tokenize the sentences
tokenized_sentences = [gensim.utils.simple_preprocess(sentence) for sentence in sentences]

# Create a dictionary and convert the sentences into a bag-of-words representation
dictionary = Dictionary(tokenized_sentences)
bow_corpus = [dictionary.doc2bow(tokens) for tokens in tokenized_sentences]

# print(bow_corpus)
# Train the LDA model
num_topics = 15  # Number of topics
lda_model = LdaModel(bow_corpus, num_topics=num_topics, id2word=dictionary, passes=10)

# Split the paragraph based on dominant topic changes
topic_chunks = []
prev_topic = None
chunk = []
for sentence, bow_vector in zip(sentences, bow_corpus):
    # Get the topic distribution for the sentence
    topic_distribution = lda_model.get_document_topics(bow_vector)
    
    # Sort the topics by probability and get the dominant topic
    dominant_topic = max(topic_distribution, key=lambda x: x[1])
    topic_id = dominant_topic[0]
    
    if topic_id != prev_topic:
        # Start a new chunk if the topic has changed
        if chunk:
            topic_chunks.append(' '.join(chunk))
        chunk = [sentence]
        prev_topic = topic_id
    else:
        # Add the sentence to the current chunk
        chunk.append(sentence)

# Add the last chunk to the list
if chunk:
    topic_chunks.append(' '.join(chunk))

# Print the topic-based chunks
dict = {}
for i in range(num_topics):
    dict[str(i)] = ""
for i, chunk in enumerate(topic_chunks):
    dict[str(i % num_topics)] +=chunk

print(dict)



# {'0': '\uf017Tuesday, May 16, 2023 Skip to main content Screen reader access Contact Us ि ह \x00 द ी English         \uf015  Research ⌄  HRD 
# ⌄  Extension ⌄  Farmer’s Corner ⌄  Services ⌄  Facilities ⌄  Publication ⌄  Announcement ⌄  Online Payment \uf002 >> Recent News >> Success stories
#  >> KVK News >> Upcoming events >> Video gallery >> Photo gallery >> NRRI in media Popular and recent NRRI Rice Varieties for Different Ecologies
#  Rice is grown under varying eco-systems and hydrological conditions ranging from waterlogged and poorly drained to well drained irrigated and rain 
# fed upland situationsItis\xa0released and noti\x00ed (2008) for cultivation in drought affected area of Jharkhand and Maharashtra state7 t/ha under 
# favorable conditionsIt has high panicles per m2 (285), normal tillering (7-10),\xa0medium and dense panicle with moderate test weightIt is released 
# and noti\x00ed (2005 SVRC; 2010 CVRC and 2006) for cultivation in Odisha and Assam0 t/haIt has\xa0short bold grains with higher HRR (head rice 
# recovery) with an average productivity of 4Hence it is a solution to the\xa0problem of inundation due to \x00ash \x00oods in coastal areas It has 
# brighter panicle colour than Swarna and bears medium slender\xa0grains with an average productivity of 5It has medium slender grains and with 6Gayatri
#  (CR 210-1018): It is a late duration (160 days), semi tall (110 cm) photosensitive popular variety, released and noti\x00ed (1988) for cultivation
#  in low land of state Odisha, West Bengal and BiharIt bears medium slender grains with average productivity of 4It has medium bold grains with an
#  average productivity of 3It is resistant to yellow stem borer and leaf folder; moderately resistant to sheath blight and bacterial leaf blight 
# etcNua Chinikamini: It is a late maturing (145-150 days), tall (140cm),photosensitive, aromatic (non-basmati) variety, released and noti\x00ed
#  (2010 and 2011) for cultivation in lowland and rainfed low land area of Odisha\uf39e \uf39e \uf099 \uf099 \uf167 \uf167Vigilance O\x00cer 
# Transparency O\x00cer Liaison O\x00cer Sitemap Feedback Contact us Help RFD Staff corner Platinum Jubilee Lecture Series ZOOM Meeting of NRRIIRINS 
# (Scientist Pro\x00le)  , Women Cell, NRRI Library catalogue, ICAR FMS-MIS, ICAR Mail, HYPM, PIMS, SAIF@ICAR-NRRI, NICRA , ICAR eO\x00ce, Database
#  of NRRI Useful Links ASRB,\xa0IRRI,\xa0DBT,\xa0NAIP,\xa0DST,\xa0OUAT,\xa0CeRA, CSIR,\xa0RKMP,\xa0Science Direct,\xa0ARRW,\xa0ICAR Institutes,
# \xa0ICAR-eSupport System,\xa0ICAR Disclaimer | Privacy statement | Accessibility statement | Linking policies | Website policies Copyright © 2019',
#  '1': 'In India, altogether 946 varieties have been released and for cultivation in different ecosystems; of these NRRI havedeveloped 105 
# varietiesIt has short bold grains with an average productivity of 3It shows\xa0resistance to major pests viz , yellow stem borer, leaf folder,
#  whorl maggot and moderate resistant to leaf blast, rice tungro virus, white backed plant hopper, brown plant hopper, gall midge, hispa and 
# thripsIt is moderately resistant to leaf blast, brown spot, sheath rot, stem borer (both dead heart and white ear heads), leaf folder, whorl
#  maggot and rice thripsIt has good quality long slender grains with an average productivity of 7It shows resistance to neck blast, sheath blight
#  and moderately resistant to yellow stem borer and gall midge This variety has lower number of tillers therefore recommended for close 
# transplanting (> 50 hills/m2)0-50-50-6It has short bold good cooking quality grains with average productivity of 56 t/ha6-4Luna Shankhi 
# (CR 2577-1): It is an early duration (110 days) variety,recently released and noti\x00ed (2012 and 2013) for cultivation in irrigated condition
#  in coastal saline area of OdishaIt has short bold grains with average productivity of 3This website belongs to National Rice Research Institute,
#  Indian Council of Agricultural Research, an Autonomous Organization under the Department of Agricultural Research and Education, Ministry of
#  Agriculture, Government of India', '2': 'Proper choice of rice variety is very important to realise high production0 to 3It could be taken up
#  in place of KhandagiriIrrigated ecologyNRRI at a glance Mandate Organization setup » Staff » O\x00cial Language Right to Information Act ICAR 
# Pension Cell\uf39e \uf39e \uf099 \uf099 \uf167 \uf167 Satabdi (CR 146-7027-224): It is a mid-early duration (120 days) variety suitable for
#  irrigated ecosystem and released and noti\x00ed\xa0(2000) for cultivation in state West Bengal0-7It could be successfully grown in place of 
# Lalat0 t/ha5 t/ha5 t/ha average yield\xa0capacity; it can be effectively cultivated in place of popular variety “Swarna” in hybrid rice category0
#  t/haIt is resistant to yellow stem borer, leaf folder, whorl maggot, thrips and moderately resistant to neck blast,leaf blast, sheath blight, 
# sheath rot and tungro virus2 t/haIt has medium slender grains with average yield capacity of 45 t/haLast updated on: Aug 9, 2021 @ 3:03 PM Total 
# visitors: 5858108\uf39e \uf39e \uf099 \uf099 \uf167 \uf167', '3': 'Optimum supply of water, nutrient, light, space and temperature are the basic 
# requirement for harvesting high yield from these varieties adapted to various eco-geographic situations5t/haAerobic rice: Pyari (CR Dhan 200): 
# It is a mid early duration (115-120 days) variety suitable for water limiting/ aerobic conditions and released (2011) for cultivation in OdishaIt
#  bears excellent quality long slender grains and has an average productivity of 45 t/haPhalguni (CR Dhan 801): It is a mid-early duration
#  (115-120 days) semidwarf, doubled haploid variety released and noti\x00ed (2010,\xa02011) for irrigated area of OdishaIt is also resistant 
# to major pests like brown plant hopper, yellow stem borer and white backed plant hopper and moderately resistant to stem borerIt has \x00eld
#  tolerance against all major diseases and pestsIt can withstand water logging and low light conditionsIt has \x00eld tolerance against major
#  diseases and pestsIt can tolerate up to one meter water stagnationIt has resistance ability against blast; moderately resistant to rice tungro 
# virus, sheath blight and stem borer etc6 t/haIt is resistant to sheath rot, neck blast and RTV and gall midge; moderately resistant to stem borer',
#  '4': 'Moreover, grain yield of any rice cultivar depends on its optimum time of sowing/planting and harvestingIt is moderately resistant to brown 
# spot, blast, gall midge, white backed plant hopper, stem borer and leaf folderIt has short bold grains and matures with average productivity of 
# 40-5It has\xa0capability to tolerate stem borer, brown plant hopper, leaf blast,bacterial leaf blight, white backed plant hopper and gall midge 
# etcIt has long slender grains with average productivity of 5Boro/ dry season rice Chandan (CR – 898): It is a medium duration (125 days) variety
#  released and noti\x00ed (2008) for cultivation under boro area of\xa0OdishaReeta (CR AC 780-1937-1-3): It is a late duration (145-150 days),
#  semidwarf (plant height 110 cm) variety, released and\xa0noti\x00ed (2010 & 2011) for cultivation in shallow lowland area of states Odisha, 
# West Bengal, Tamil Nadu and Andhra PradeshIt exerts moderate resistance to rice tungro, blight, GLH and leaf blastIt has signi\x00cant 
#  of grain dormancy, can tolerates up to 50 cm water stagnation and suitable for delayed transplantingCoastal Saline Ecosystem\uf39e \uf39e 
# \uf099 \uf099 \uf167 \uf167PIDPI SHEBOX Citizen CharterQuick Links Location Map Director’s Message Luna Suvarna (CR LC2096-71-2): It is a tall
#  (135 cm) late maturing (150 days) salt tolerant (5Luna Barial (58CR 2092-1-3): It is a late duration (150-155 days) saline tolerance (5It is 
# moderately resistant to blast and sheath blight and suitable for dry season cultivationIt is recommended for close\xa0planting', '5': 'In this
#  context, the knowledge regarding high yielding varieties is highly essential for a good harvestIt is suitable for direct seeded cultivation 
# in infed upland0 t/ha0 t/ha;and can tolerate water stagnation (7-10 days) at tillering stage0-6It has medium slender grains and has an average 
# productivity of 5It\xa0has medium slender grains with an average productivity of 5Semi Deep/ Water Logged Ecosystem Sarala (CR 260-77): It is 
# a late duration (160 days) semi tall (110-120 cm) non- lodging, photo-sensitive variety, released and\xa0noti\x00ed (2000) for cultivation in 
# semi deep water/ coastal area of OdishaVarshadhan (CRLC 899): It is a long duration (160 days), tall (150 cm) non-lodging, stiff strewed 
# photosensitive popular variety, released and noti\x00ed (2005 and 2006) for cultivation in low land area of the state Odisha, West Bengal and
#  Assam0 to 80 to 8Aromatic Rice Nua Kalajeera : It is a late maturing (145 days) tall (140 cm) photosensitive variety, released and noti\x00ed 
# (2008) for cultivation in\xa0low land area of OdishaPurnabhog (CRM 2203-4): It is a late maturing (140-145 days) aromatic (non-basmati) variety,
#  recently released (2012) for cultivation in irrigated and shallow lowland area of Odisha', '6': 'This compilation describes brie\x00y NRRI bred 
# popular varieties suitable to different ecologiesShabhagidhan (IR 74371-70-1-1-CRR-1): It is an early duration (100 days) dwarf statured (85-90 cm) 
# highly drought tolerance popular variety suitable for upland, rainfed direct seeded as well as transplanted conditionsIt is moderately resistant to 
# leaf blast, neck blast, brown spot, blast, yellow stem borer and leaf folderThis variety is moderately resistant to bacterial leaf blight, sheath
# blight and Sheath rot etcAjay (CRHR-7): It is a medium duration (125-135 days) semi dwarf (105-110 cm) popular hybrid variety released and 
# noti\x00ed (2005 and 2006) for cultivation under irrigated and shallow lowland area in state of Odisha0 t/ha5-65 t/haIt has medium slender grains
#  possesses seed dormancy\xa0and has an average productivity of 4It\xa0has long bold grains with average productivity of 40 dsM-1) variety, 
# recently released and noti\x00ed (2010 and 2011) for cultivation in coastal saline area of Odisha0 ds M-1) variety, recently released and 
# noti\x00ed (2012 and 2012) for cultivation in coastal saline area of OdishaIt has short bold black husked scented (nonbasmati type) grains
#  with average productiv