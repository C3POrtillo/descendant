import Script from 'next/script';
import React from 'react';

import type { FC } from 'react';

import Socials from '@/components/socials/Socials';

const Footer: FC = () => (
  <footer className="flex flex-col place-items-center content-center justify-center gap-4 bg-slate-800 p-8 text-center">
    <div className="text-2xl">
      Developed by: cam
    </div>
    <Socials />
    <Script async src="https://kit.fontawesome.com/ce4be88325.js"/>
  </footer>
);

export default Footer;
