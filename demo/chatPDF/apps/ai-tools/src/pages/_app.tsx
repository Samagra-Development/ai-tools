import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import ContextProvider from '../context/ContextProvider';
import { ReactElement, useEffect } from 'react';
import 'chatui/dist/index.css';
import { Toaster } from 'react-hot-toast';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function SafeHydrate({ children }: { children: ReactElement }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    (async () => {
      // Get the visitor identifier when you need it.
      const fp = await fpPromise;
      const result = await fp.get();
      const stringToUuid = (str: any) => {
        str = str.replace('-', '');
        return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(
          /[x]/g,
          function (c, p) {
            return str[p % str.length];
          }
        );
      };
      localStorage.setItem('userID', stringToUuid(result?.visitorId));
    })();
  }, []);

  if (process.env.NODE_ENV === 'production') {
    globalThis.console.log = () => {};
  }

  return (
    <ChakraProvider>
      <ContextProvider>
        <div style={{ height: '100%' }}>
          <Toaster position="top-center" reverseOrder={false} />
          <SafeHydrate>
            <Component {...pageProps} />
          </SafeHydrate>
        </div>
      </ContextProvider>
    </ChakraProvider>
  );
};

export default App;
