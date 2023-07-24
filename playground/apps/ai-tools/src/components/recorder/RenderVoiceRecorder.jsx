import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Stop from '../../assets/icons/stop.gif';
import Start from '../../assets/icons/startIcon.svg';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import { Grid, Typography, Button } from '@material-ui/core';
import styles from './styles.module.css';
import ComputeAPI from './Model/ModelSearch/HostedInference';
import toast from 'react-hot-toast';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';

const RenderVoiceRecorder = ( props ) => {
  const t = useLocalization();
  const [gender, setGender] = useState('female');
  const [recordAudio, setRecordAudio] = useState('');
  const [base, setBase] = useState('');
  const [data, setData] = useState('');
  const [outputBase64, setOutputBase64] = useState('');
  const [suggestEditValues, setSuggestEditValues] = useState({
    asr: '',
    translation: '',
  });
  const [audio, setAudio] = useState('');
  const [output, setOutput] = useState({
    asr: '',
    translation: '',
  });
  const [filter, setFilter] = useState({
    src: 'hi',
    tgt: 'en',
    asr: '',
    translation: '',
    tts: '',
  });

  const handleStopRecording = () => {
    setRecordAudio(RecordState.STOP);
  };

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setRecordAudio(RecordState.START);
      })
      .catch((err) => {
        toast.error('Please allow microphone permission');
        console.error(err);
        return;
      });
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(blob);
    });
  };

  function wordToNumber(word) {
    const numberWords = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
      thirty: 30,
      forty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
      hundred: 100,
      thousand: 1000,
      million: 1000000,
      billion: 1000000000,
      trillion: 1000000000000,
    };

    const words = word.toLowerCase().split(/[ ,]+/);
    // console.log("hi", words)
    let currentNumber = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      // skip these words
      if(word === 'and' || word === 'or') continue;

      if (numberWords[word] || numberWords[word] === 0) {
        currentNumber += numberWords[word];
      } else if (word === 'and') {
        continue;
      } else if (word.includes('-')) {
        const hyphenWords = word.split('-');
        const first = hyphenWords[0];
        const second = hyphenWords[1];
        currentNumber += numberWords[first] + numberWords[second];
      }
    }

    return currentNumber;
  }

  useEffect(() => {
    if (data && base) {
      handleCompute();
      // setData();
      setBase();
    }
  }, [data, handleCompute, base]);

  const onStopRecording = async (data) => {
    setData(data.url);
    try {
      const base64Data = await blobToBase64(data.blob);
      setBase(base64Data);
      //  setTimeout(()=>{
      //   handleCompute()
      //  },50)
      // setOutput({
      //   asr: '',
      //   translation: '',
      // });
    } catch (error) {
      console.error('Error converting Blob to Base64:', error);
    }
  };

  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const makeComputeAPICall = async (type) => {
    // const headers = {
    //   'Content-Type': 'application/json',
    //   authorization: process.env.NEXT_PUBLIC_DHRUVA_AUTH,
    // };
    // const data = {
    //   config: {
    //     language: {
    //       sourceLanguage: localStorage.getItem('locale'),
    //     },
    //   },
    //   audio: [
    //     {
    //       audioContent: base.split('base64,')[1],
    //     },
    //   ],
    // };

    // try {
    toast.success(`${t('message.recorder_wait')}`);
    //   const response = await fetch('/api/stt', {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     const text = await response.json();
    //     props.setInputMsg(text?.output?.[0]?.source);
    //     // props.setInputMsg('मेरा पैसा कहाँ है');
    //   } else {
    //     console.error('Error:', response.status);
    //   }
    // } catch (err) {
    //   toast.error(`${t('message.recorder_error')}`);
    // }

    setAudio(null);

    const modelId_ASR = () => {
      const lang = localStorage.getItem('locale') || 'en';
      switch (lang) {
        case 'hi':
          return '63c9585dc37c442f683d69dd';
        case 'bn':
          return '6411746956e9de23f65b5426';
        case 'ta':
          return '641174ad56e9de23f65b542a';
        case 'te':
          return '6411748db1463435d2fbaec5';
        default:
          return '63c9586ea0e5e81614ff96a8';
      }
    };
    const modelId_TRANSLATION = () => {
      const lang = localStorage.getItem('locale') || 'en';
      switch (lang) {
        case 'hi':
          return '6110f8b7014fa35d5e767c48';
        case 'bn':
          return '6110f7bc014fa35d5e767c3b';
        case 'ta':
          return '6110f917014fa35d5e767c4e';
        case 'te':
          return '6110f924014fa35d5e767c4f';
        default:
          return '63ee09c3b95268521c70cd7c';
      }
    };
    // console.log('hello', modelId_ASR());
    const apiObj = new ComputeAPI(
      modelId_ASR(), //modelId
      type === 'url' ? url : base, //input URL
      'asr', //task
      type === 'voice' ? true : false, //boolean record audio
      localStorage.getItem('locale') || 'en', //source
      filter.asr.inferenceEndPoint, //inference endpoint
      '' //gender
    );
    // const apiObj = new ComputeAPI(
    //   filter.asr.value, //modelId
    //   type === 'url' ? url : base, //input URL
    //   'asr', //task
    //   type === 'voice' ? true : false, //boolean record audio
    //   filter.src.value, //source
    //   filter.asr.inferenceEndPoint, //inference endpoint
    //   '' //gender
    // );

    // console.log('ghji:', { body: apiObj.getBody() });
    fetch(apiObj.apiEndPoint(), {
      method: 'post',
      body: JSON.stringify(apiObj.getBody()),
      headers: apiObj.getHeaders().headers,
    })
      .then(async (resp) => {
        let rsp_data = await resp.json();
        if (resp.ok && rsp_data !== null) {
          console.log("hi", rsp_data.data.source);
          console.log("hi", props.wordToNumber);
          if (props.wordToNumber) {
            // translating other language words to english words
            if (localStorage.getItem('locale') && localStorage.getItem('locale') !== 'en') {
              const obj = new ComputeAPI(
                modelId_TRANSLATION(),
                rsp_data.data.source,
                'translation',
                '',
                '',
                '',
                ''
              );
              fetch(obj.apiEndPoint(), {
                method: 'post',
                body: JSON.stringify(obj.getBody()),
                headers: obj.getHeaders().headers,
              }).then(async (translationResp) => {
                let rsp_data = await translationResp.json();
                console.log("hi", wordToNumber(rsp_data.output[0].target))
                if (translationResp.ok) {
                  // setOutput((prev) => ({
                  //   ...prev,
                  //   translation: rsp_data.output[0].target,
                  // }));
                  // setSuggestEditValues((prev) => ({
                  //   ...prev,
                  //   translation: rsp_data.output[0].target,
                  // }));
                }
                props.setInputMsg(wordToNumber(rsp_data.output[0].target));
              });
            } else props.setInputMsg(wordToNumber(rsp_data.data.source));
          } else props.setInputMsg(rsp_data.data.source);
          // setSuggestEditValues((prev) => ({
          //   ...prev,
          //   asr: rsp_data.data.source,
          // }));

          // const obj = new ComputeAPI(
          //   filter.translation.value,
          //   rsp_data.data.source,
          //   'translation',
          //   '',
          //   '',
          //   filter.translation.inferenceEndPoint,
          //   ''
          // );
          // fetch(obj.apiEndPoint(), {
          //   method: 'post',
          //   body: JSON.stringify(obj.getBody()),
          //   headers: obj.getHeaders().headers,
          // })
          //   .then(async (translationResp) => {
          //     let rsp_data = await translationResp.json();
          //     if (translationResp.ok) {
          //       setOutput((prev) => ({
          //         ...prev,
          //         translation: rsp_data.output[0].target,
          //       }));
          //       setSuggestEditValues((prev) => ({
          //         ...prev,
          //         translation: rsp_data.output[0].target,
          //       }));
          // const obj = new ComputeAPI(
          //   process.env.NEXT_PUBLIC_TTS_MODEL_ID,
          //   "मेरा पैसा कहाँ है",
          //   'tts',
          //   '',
          //   '',
          //   filter.tts.inferenceEndPoint,
          //   'female',
          // );
          // fetch(obj.apiEndPoint(), {
          //   method: 'post',
          //   headers: obj.getHeaders().headers,
          //   body: JSON.stringify(obj.getBody()),
          // })
          //   .then(async (ttsResp) => {
          //     let rsp_data = await ttsResp.json();
          //     console.log("hello", rsp_data);
          //     if (ttsResp.ok) {
          //       if (rsp_data.audio[0].audioContent) {
          //         const blob = b64toBlob(rsp_data.audio[0].audioContent, 'audio/wav');
          //         setOutputBase64(rsp_data.audio[0].audioContent);
          //         const urlBlob = window?.URL.createObjectURL(blob);
          //         setAudio(urlBlob);
          //       } else {
          //         setOutputBase64(rsp_data.audio[0].audioUri);
          //         setAudio(rsp_data.audio[0].audioUri);
          //       }
          //     } else {
          //       toast.error(rsp_data.message);
        }
      })
      .catch(async (error) => {
        console.error(error);
        toast.error(
          'Unable to process your request at the moment. Please try after sometime.'
        );
      });
    //   } else {
    //     toast.error(rsp_data.message);
    //   }
    // })
    // .catch(async (error) => {
    //   toast.error(
    //     'Unable to process your request at the moment. Please try after sometime.'
    //   );
    // });
    //       } else {
    //         toast.error(rsp_data.message);
    //       }
    //     })
    //     .catch(async (error) => {
    //       toast.error(`${t('message.recorder_error')}`);
    //     });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCompute = () => {
    makeComputeAPICall('voice');
  };

  return (
    <div>
      <div>
        {recordAudio === 'start' ? (
          <div className={styles.center}>
            <Image
              src={Stop}
              alt="stopIcon"
              onClick={() => handleStopRecording()}
              style={{ cursor: 'pointer' }}
              layout="responsive"
            />{' '}
          </div>
        ) : (
          <div className={styles.center}>
            <Image
              src={Start}
              alt="startIcon"
              onClick={() => {
                handleStartRecording();
              }}
              style={{ cursor: 'pointer' }}
              layout="responsive"
            />{' '}
          </div>
        )}
      </div>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {/* <div className={styles.center}>
          <Typography style={{ height: '12px' }} variant="caption">
            {recordAudio === 'start' ? 'Recording...' : ''}
          </Typography>{' '}
        </div> */}
        <div style={{ display: 'none' }}>
          <AudioReactRecorder
            state={recordAudio}
            onStop={onStopRecording}
            style={{ display: 'none' }}
          />
        </div>
        {/* <div className={styles.centerAudio} style={{ height: '60px' }}>
          {audio ? (
            <audio
              src={audio}
              style={{ minWidth: '100%' }}
              controls
              id="sample"></audio>
          ) : (
            <></>
          )}
        </div> */}
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={1}>
          <Grid item xs={8} sm={12} md={10} lg={10} xl={10}>
            <Typography variant={'caption'}>Max duration: 1 min</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sm={12}
            md={2}
            lg={2}
            xl={2}
            className={styles.flexEndStyle}>
            <Button
              style={{}}
              color="primary"
              variant="contained"
              size={'small'}
              disabled={data ? false : true}
              onClick={() => handleCompute()}>
              Convert
            </Button>
          </Grid>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default RenderVoiceRecorder;
