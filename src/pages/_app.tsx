import { Inconsolata } from 'next/font/google';
import '@/styles/globals.css';
import Script from 'next/script';

import type { AppProps } from 'next/app';

const inconsolata = Inconsolata({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inconsolata',
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <main className={`${inconsolata.variable} flex grow flex-col justify-between gap-8 font-sans`}>
      <Component {...pageProps} />
    </main>
    <Script async src="https://kit.fontawesome.com/ce4be88325.js" />
  </>
);

export default MyApp;
