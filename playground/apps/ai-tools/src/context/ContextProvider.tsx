'use client';
import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { AppContext } from '.';
import _ from 'underscore';
import { v4 as uuidv4 } from 'uuid';
import { send } from '../socket';
import { UserType } from '../types';
import { IntlProvider } from 'react-intl';
import { useLocalization } from '../hooks';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ComputeAPI from '../components/recorder/Model/ModelSearch/HostedInference';

function loadMessages(locale: string) {
  switch (locale) {
    case 'en':
      return import('../../lang/en.json');
    case 'hi':
      return import('../../lang/hi.json');
    case 'bn':
      return import('../../lang/bn.json');
    case 'ta':
      return import('../../lang/ta.json');
    case 'te':
      return import('../../lang/te.json');
    default:
      return import('../../lang/en.json');
  }
}

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || '';

const ContextProvider: FC<{
  locale: any;
  localeMsgs: any;
  setLocale: any;
  children: ReactElement;
}> = ({ locale, children, localeMsgs, setLocale }) => {
  const t = useLocalization();
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);
  const [isMsgReceiving, setIsMsgReceiving] = useState(false);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [socketSession, setSocketSession] = useState<any>();
  const [newSocket, setNewSocket] = useState<any>();
  const [conversationId, setConversationId] = useState<string | null>(
    sessionStorage.getItem('conversationId')
  );
  const [isMobileAvailable, setIsMobileAvailable] = useState(
    localStorage.getItem('userID') ? true : false || false
  );
  const [isDown, setIsDown] = useState(true);
  const [showDialerPopup, setShowDialerPopup] = useState(false);
  const [isConnected, setIsConnected] = useState(newSocket?.connected || false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  console.log(messages);
  useEffect(() => {
    if (
      localStorage.getItem('userID')
      // && localStorage.getItem('auth')
      //  || isMobileAvailable
    ) {
      setNewSocket(
        io(URL, {
          transportOptions: {
            polling: {
              extraHeaders: {
                // Authorization: `Bearer ${localStorage.getItem('auth')}`,
                channel: 'akai',
              },
            },
          },
          query: {
            deviceId: localStorage.getItem('userID'),
          },
          autoConnect: false,
          // transports: ['polling', 'websocket'],
          upgrade: false,
        })
      );
    }
  }, [isMobileAvailable]);

  const updateMsgState = useCallback(
    ({
      user,
      msg,
      media,
    }: {
      user: { name: string; id: string };
      msg: { content: { title: string; choices: any }; messageId: string };
      media: any;
    }) => {
      if (msg.content.title !== '') {
        const newMsg = {
          username: user?.name,
          text: msg.content.title,
          choices: msg.content.choices,
          position: 'left',
          id: user?.id,
          botUuid: user?.id,
          reaction: 0,
          messageId: msg?.messageId,
          //@ts-ignore
          conversationId: msg?.content?.conversationId,
          sentTimestamp: Date.now(),
          ...media,
        };

        //@ts-ignore
        if (conversationId === msg?.content?.conversationId)
          setMessages((prev: any) => _.uniq([...prev, newMsg], ['messageId']));
      }
    },
    [conversationId]
  );

  console.log('erty:', { conversationId });

  const onMessageReceived = useCallback(
    async (msg: any) => {
      console.log('mssgs:', messages);
      console.log('#-debug:', { msg });
      setIsMsgReceiving(false);
      //@ts-ignore
      const user = JSON.parse(localStorage.getItem('currentUser'));

      if (msg.content.msg_type.toUpperCase() === 'IMAGE') {
        updateMsgState({
          user,
          msg,
          media: { imageUrl: msg?.content?.media_url },
        });
      } else if (msg.content.msg_type.toUpperCase() === 'AUDIO') {
        updateMsgState({
          user,
          msg,
          media: { audioUrl: msg?.content?.media_url },
        });
      } else if (msg.content.msg_type.toUpperCase() === 'VIDEO') {
        updateMsgState({
          user,
          msg,
          media: { videoUrl: msg?.content?.media_url },
        });
      } else if (
        msg.content.msg_type.toUpperCase() === 'DOCUMENT' ||
        msg.content.msg_type.toUpperCase() === 'FILE'
      ) {
        updateMsgState({
          user,
          msg,
          media: { fileUrl: msg?.content?.media_url },
        });
      } else if (msg.content.msg_type.toUpperCase() === 'TEXT') {
        try {
          if(localStorage.getItem('locale') === 'en'){
            setLoading(false);
            updateMsgState({ user, msg, media: {} });
            return;
          }
          const modelId_TRANSLATION = () => {
            const lang = localStorage.getItem('locale') || 'en';
            switch (lang) {
              case 'hi':
                return '6110f7f7014fa35d5e767c3f';
              case 'bn':
                return '6110f7da014fa35d5e767c3d';
              case 'ta':
                return '610cfe8b014fa35d5e767c35';
              case 'te':
                return '6110f89b014fa35d5e767c46';
              default:
                return '63ee09c3b95268521c70cd7c';
            }
          };

          if(msg.content.split){
            let titles = msg.content.title.split(`\n`);
            for(let i=0; i<titles.length; i++){
              const obj = new ComputeAPI(
                modelId_TRANSLATION(),
                titles[i],
                'translation',
                '',
                '',
                '',
                ''
              );
              const res = await fetch(obj.apiEndPoint(), {
                method: 'post',
                body: JSON.stringify(obj.getBody()),
                headers: obj.getHeaders().headers,
              });
              const rsp_data = await res.json();
              console.log('hi', rsp_data.output[0].target);
              titles[i] = rsp_data.output[0].target;
            }
            msg.content.title = titles.join(`\n`);
            setLoading(false);
            updateMsgState({ user, msg, media: {} });
          }else{
            const obj = new ComputeAPI(
              modelId_TRANSLATION(),
              msg.content.title,
              'translation',
              '',
              '',
              '',
              ''
            );
            const res = await fetch(obj.apiEndPoint(), {
              method: 'post',
              body: JSON.stringify(obj.getBody()),
              headers: obj.getHeaders().headers,
            });
            const rsp_data = await res.json();
            console.log('hi', rsp_data.output[0].target);
            msg.content.title = rsp_data.output[0].target;
            setLoading(false);
            updateMsgState({ user, msg, media: {} });
          }
        } catch (err) {
          console.error(err);
        }
      }
    },
    [messages, updateMsgState]
  );

  //@ts-ignore
  const onSocketConnect = useCallback(
    ({ text }: { text: string }): void => {
      setIsConnected(false);
      setTimeout(() => {
        newSocket?.connect();
        setIsConnected(true);
      }, 30);

      setTimeout(() => {
        if (newSocket?.connected) sendMessage(text, null);
      }, 40);
      //@ts-ignore
    },
    [newSocket, sendMessage]
  );

  useEffect(() => {
    if (
      (!isConnected && newSocket && !newSocket.connected) ||
      (newSocket && !newSocket.connected)
    ) {
      newSocket.connect();
      setIsConnected(true);
    }
  }, [isConnected, newSocket]);

  useEffect(() => {
    function onConnect(): void {
      setIsConnected(true);
    }

    function onDisconnect(): void {
      setIsConnected(false);
    }

    function onSessionCreated(sessionArg: { session: any }) {
      setSocketSession(sessionArg);
    }

    function onException(exception: any) {
      toast.error(exception?.message);
    }

    if (newSocket) {
      newSocket.on('connect', onConnect);
      newSocket.on('disconnect', onDisconnect);
      newSocket.on('botResponse', onMessageReceived);

      newSocket.on('exception', onException);
      newSocket.on('session', onSessionCreated);
    }

    return () => {
      if (newSocket) {
        newSocket.off('disconnect', onDisconnect);
      }
    };
  }, [isConnected, newSocket, onMessageReceived]);

  const onChangeCurrentUser = useCallback((newUser: UserType) => {
    setCurrentUser({ ...newUser, active: true });
    // setMessages([]);
  }, []);
  console.log('vbnmm:', { newSocket });

  //@ts-ignore
  const sendMessage = useCallback(
    async (text: string, media: any, isVisibile = true) => {
      if (
        !localStorage.getItem('userID') ||
        !sessionStorage.getItem('conversationId')
      ) {
        removeCookie('access_token', { path: '/' });
        location?.reload();
        return;
      }
      // console.log('mssgs:', messages)
      setIsMsgReceiving(true);

      if (!newSocket?.connected || !socketSession) {
        toast(
          (to) => (
            <span>
              <Button
                onClick={() => {
                  onSocketConnect({ text });
                  toast.dismiss(to.id);
                }}>
                {t('label.click')}
              </Button>
              {t('message.socket_disconnect_msg')}
            </span>
          ),
          {
            icon: '',
            duration: 10000,
          }
        );
        return;
      }
        setLoading(true);
        send({ text, socketSession, socket: newSocket, conversationId });
      //  console.log('mssgs:',messages)
      if (isVisibile)
        if (media) {
          if (media.mimeType.slice(0, 5) === 'image') {
          } else if (media.mimeType.slice(0, 5) === 'audio' && isVisibile) {
          } else if (media.mimeType.slice(0, 5) === 'video') {
          } else if (media.mimeType.slice(0, 11) === 'application') {
          } else {
          }
        } else {
          //console.log('mssgs:',messages)
          //@ts-ignore
          setMessages((prev: any) => [
            ...prev.map((prevMsg: any) => ({ ...prevMsg, disabled: true })),
            {
              username: 'state.username',
              text: text,
              position: 'right',
              botUuid: currentUser?.id,
              payload: { text },
              time: Date.now(),
              disabled: true,
              messageId: uuidv4(),
              repliedTimestamp: Date.now(),
            },
          ]);
          //    console.log('mssgs:',messages)
        }
    },
    [
      newSocket,
      socketSession,
      conversationId,
      t,
      onSocketConnect,
      currentUser?.id,
    ]
  );

  const fetchIsDown = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/health/20`
      );
      const status = res.data.status;
      console.log('hie', status);
      if (status === 'OK') {
        setIsDown(false);
      } else {
        setIsDown(true);
        console.log('Server status is not OK');
      }
    } catch (error) {
      console.error(error);
    }
  }, [setIsDown]);

  useEffect(() => {
    if (!socketSession && newSocket) {
      console.log('vbn:', { socketSession, newSocket });
    }
  }, [newSocket, socketSession]);

  console.log('vbn: aa', {
    socketSession,
    newSocket,
    isConnected,
    isMobileAvailable,
  });

  useEffect(() => {
    if (isDown) return;
    let secondTimer: any;
    const timer = setTimeout(() => {
      if (isMsgReceiving && loading) {
        toast.error(`${t('message.taking_longer')}`);
        secondTimer = setTimeout(() => {
          if (isMsgReceiving && loading) {
            toast.error(`${t('message.retry')}`);
            setIsMsgReceiving(false);
            setLoading(false);
            fetchIsDown();
          }
        }, 25000);
      }
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, [fetchIsDown, isDown, isMsgReceiving, loading, t]);

  const values = useMemo(
    () => ({
      currentUser,
      allUsers: users,
      toChangeCurrentUser: onChangeCurrentUser,
      sendMessage,
      messages,
      setMessages,
      loading,
      setLoading,
      socketSession,
      isMsgReceiving,
      setIsMsgReceiving,
      locale,
      setLocale,
      localeMsgs,
      isMobileAvailable,
      setIsMobileAvailable,
      setConversationId,
      onSocketConnect,
      newSocket,
      isDown,
      fetchIsDown,
      showDialerPopup,
      setShowDialerPopup,
      showPopUp,
      setShowPopUp,
      isAudioPlaying,
      setIsAudioPlaying,
      audioRef,
    }),
    [
      locale,
      isMobileAvailable,
      setIsMobileAvailable,
      setLocale,
      localeMsgs,
      currentUser,
      socketSession,
      users,
      onChangeCurrentUser,
      sendMessage,
      messages,
      loading,
      setLoading,
      isMsgReceiving,
      setIsMsgReceiving,
      setConversationId,
      onSocketConnect,
      newSocket,
      isDown,
      fetchIsDown,
      showDialerPopup,
      setShowDialerPopup,
      showPopUp,
      setShowPopUp,
      isAudioPlaying,
      setIsAudioPlaying,
      audioRef,
    ]
  );

  return (
    //@ts-ignore
    <AppContext.Provider value={values}>
      <IntlProvider locale={locale} messages={localeMsgs}>
        {children}
      </IntlProvider>
    </AppContext.Provider>
  );
};

const SSR: FC<{ children: ReactElement }> = ({ children }) => {
  const [locale, setLocale] = useState('');
  const [localeMsgs, setLocaleMsgs] = useState<Record<string, string> | null>(
    null
  );
  useEffect(() => {
    setLocale(localStorage.getItem('locale') || 'en');
  }, [])
  
  useEffect(() => {
    loadMessages(locale).then((res) => {
      //@ts-ignore
      setLocaleMsgs(res);
    });
  }, [locale]);

  if (typeof window === 'undefined') return null;
  return (
    //@ts-ignore
    <IntlProvider locale={locale} messages={localeMsgs}>
      <ContextProvider
        locale={locale}
        setLocale={setLocale}
        localeMsgs={localeMsgs}>
        {children}
      </ContextProvider>
    </IntlProvider>
  );
};
export default SSR;
