/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable tailwindcss/no-custom-classname */
import Script from 'next/script';
import React from 'react';

import type { FC } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/header/TFDHeader';

const Index: FC = () => (
  <>
    <Header />
    <div className="m-auto flex h-full items-center">
      <video controls autoPlay muted>
        <source src="https://i.imgur.com/U0gFDs8.mp4" type="video/mp4" />
      </video>
    </div>
    <Script src="https://embed.reddit.com/widgets.js" />
    <Footer />
  </>
);

export default Index;
