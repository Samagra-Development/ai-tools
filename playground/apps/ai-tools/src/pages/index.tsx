import type { NextPage } from "next";
import Head from "next/head";
import { useLocalization } from "../hooks/useLocalization";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import dynamic from "next/dynamic";
import LeftSide from '../components/LeftSide';
import MiddleSide from '../components/MiddleSide';

const ChatUiWindow = dynamic(
  () => import('../components/ChatWindow/ChatUiWindow'),
  { ssr: false }
);

const Home: NextPage = () => {
  const t = useLocalization();
  const context = useContext(AppContext);
  useEffect(() => {
    // if (localStorage.getItem("userID")) {
      context?.setIsMobileAvailable(true);
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.setIsMobileAvailable]);

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
        {/* <div
          style={{
            backgroundColor: '#001529',
            width: '18vw',
            color: 'white',
            padding: '1vh',
          }}>
          <LeftSide />
        </div> */}
        <div
          style={{
            backgroundColor: '#0B1F3A',
            width: '50vw',
            padding: '1vh',
          }}>
          <MiddleSide />
        </div>
        <div
          style={{
            width: '50vw',
            height: '91vh',
          }}>
          <ChatUiWindow />
        </div>
      </div>
    </>
  );
};
export default Home;
