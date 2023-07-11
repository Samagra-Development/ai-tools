import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useLocalization } from '../hooks/useLocalization';
import LeftSide from '../components/LeftSide';
import MiddleSide from '../components/MiddleSide';

const ChatUiWindow = dynamic(
  () => import('../components/ChatWindow/ChatUiWindow'),
  { ssr: false }
);

const Chat: NextPage = () => {
  const t = useLocalization();
  return (
    <>
      <Head>
        <title> {t('label.title')}</title>
      </Head>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
        }}>
        <div
          style={{
            backgroundColor: '#001529',
            width: '18vw',
            color: 'white',
            padding: '1vh',
          }}>
          <LeftSide />
        </div>
        <div
          style={{
            backgroundColor: '#0B1F3A',
            width: '40vw',
            padding: '1vh',
          }}>
          <MiddleSide />
        </div>
        <div
          style={{
            width: '42vw',
            height: '91vh',
          }}>
          <ChatUiWindow />
        </div>
      </div>
    </>
  );
};
export default Chat;
