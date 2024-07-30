import type { FC } from 'react';

import Socials from '@/components/socials/Socials';

const Footer: FC = () => (
  <footer className="flex flex-col place-items-center content-center justify-center gap-2 bg-slate-800 p-8 text-center">
    <div className="flex flex-row gap-4">
      <div className="border-r-2 border-white px-4">
        <p className="text-base md:text-xl">Developed by: cam</p>
        <div className="social flex flex-row place-items-center justify-center gap-1 text-sm md:text-lg">
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <i className="fab fa-discord tfd-link-icon" />
          cam_ilo
        </div>
      </div>
      <Socials />
    </div>
    <p className="text-sm md:text-base">
      ortillo.cam is not endorsed or affiliated with NEXON GamesCo., Ltd., NEXON Korea Corp, or any of its
      subsidaries/affiliates
    </p>
  </footer>
);

export default Footer;
