import React from 'react';

import type { FC } from 'react';

import Socials from '@/components/socials/Socials';

const Footer: FC = () => (
  <footer className="flex flex-col place-items-center content-center justify-center gap-4 bg-slate-800 p-8 text-center">
    <div className="text-3xl">Developed by: cam</div>
    <Socials />
  </footer>
);

export default Footer;
