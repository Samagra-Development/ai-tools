import type { NextPage } from 'next';
import Head from 'next/head';
import { useLocalization } from '../hooks/useLocalization';
import dynamic from 'next/dynamic';
import LeftSide from '../components/LeftSide';
import MiddleSide from '../components/MiddleSide';
import { AppContext } from '../context';
import { useContext } from 'react';

const ChatUiWindow = dynamic(
  () => import('../components/ChatWindow/ChatUiWindow'),
  { ssr: false }
);

const Home: NextPage = () => {
  const t = useLocalization();
  const context = useContext(AppContext);
  const { collapsed } = context;

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
            flex: collapsed ? '0.05' : '0.2',
            color: 'white',
            padding: '1vh',
            transition: 'all 0.2s ease',
          }}>
          <LeftSide />
        </div>
        <div
          style={{
            backgroundColor: '#0B1F3A',
            flex: 1,
          }}>
          <MiddleSide />
        </div>
        <div
          style={{
            flex: 1,
            height: '90vh',
          }}>
          <ChatUiWindow />
        </div>
      </div>

      {/* Mobile View */}
      <style jsx>{`
        @media (max-width: 767px) {
          div {
            display: none;
          }
          div:last-child {
            display: block;
          }
        }
      `}</style>
    </>
  );
};
export default Home;
