sudo apt-get install liblzma-dev libbz2-dev libzstd-dev libsndfile1-dev libopenblas-dev libfftw3-dev libgflags-dev libgoogle-glog-dev
sudo apt install build-essential cmake libboost-system-dev libboost-thread-dev libboost-program-options-dev libboost-test-dev libeigen3-dev zlib1g-dev libbz2-dev liblzma-dev ffmpeg
python3 -m venv venv
source venv/bin/activate
pip3 install packaging  soundfile  swifter  joblib==1.0.0  indic-nlp-library tqdm==4.56.0 numpy==1.20.0  pandas==1.2.2  progressbar2==3.53.1 python_Levenshtein==0.12.2  editdistance==0.3.1  omegaconf==2.0.6 tensorboard==2.4.1  tensorboardX==2.1  wandb  jiwer  jupyterlab 
git clone https://github.com/AI4Bharat/fairseq.git
pip3 install --editable fairseq/./
pip3 install  install flask flask-cors flask_sockets pydub webrtcvad nltk langdetect simpletransformers flashlight-text protobuf==3.20.1

git clone https://github.com/kpu/kenlm
cd kenlm
mkdir build
cd build
cmake ..
make -j 4
sudo make install
cd ..
export KENLM_ROOT=$PWD
cd ..

git clone https://github.com/flashlight/text && cd text
mkdir build && cd build
cmake .. -DFL_TEXT_BUILD_TESTS=OFF
make -j$(nproc)
make test
sudo make install 


mkdir data && cd data
wget https://indic-asr-public.objectstore.e2enetworks.net/aaai_ckpts/models/or/or.pt
mv or.pt odia.pt
mkdir or && cd or
wget https://indic-asr-public.objectstore.e2enetworks.net/aaai_ckpts/models/or/lexicon.lst
wget https://indic-asr-public.objectstore.e2enetworks.net/aaai_ckpts/models/or/lm.binary
cd ..
cd ..
git clone https://github.com/AI4Bharat/IndicWav2Vec.git
cp models_info.json IndicWav2Vec/ULCA_Compliance/app/
cp flask_api IndicWav2Vec/ULCA_Compliance/app/
cp support.py IndicWav2Vec/ULCA_Compliance/app/
cd IndicWav2Vec/ULCA_Compliance/app/
gunicorn flask_api:app --workers 5 --timeout 600