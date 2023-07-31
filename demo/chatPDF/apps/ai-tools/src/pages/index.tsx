import type { NextPage } from 'next';
import Head from 'next/head';
import { useLocalization } from '../hooks/useLocalization';
import dynamic from 'next/dynamic';
import LeftSide from '../components/LeftSide';
import MiddleSide from '../components/MiddleSide';

const ChatUiWindow = dynamic(
  () => import('../components/ChatWindow/ChatUiWindow'),
  { ssr: false }
);

const Home: NextPage = () => {
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
            width: '41vw',
          }}>
          <MiddleSide />
        </div>
        <div
          style={{
            width: '41vw',
            height: '90vh',
          }}>
          <ChatUiWindow />
        </div>
      </div>
    </>
  );
};
export default Home;
