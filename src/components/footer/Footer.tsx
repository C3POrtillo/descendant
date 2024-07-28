import React from 'react';

import type { FC } from 'react';

import Socials from '@/components/socials/Socials';

const Footer: FC = () => (
  <footer className="flex flex-col place-items-center content-center justify-center gap-4 bg-slate-800 p-8 text-center">
    <p className="text-3xl">Developed by: cam</p>
    <div className="social flex flex-row place-items-center gap-1 text-2xl">
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <i className="discord fab fa-discord before:text-4xl" />
      cam_ilo
    </div>
    <Socials />
  </footer>
);

export default Footer;
