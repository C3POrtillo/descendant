import React from 'react';

import type { FC } from 'react';

const Footer: FC = () => (
  <div className="flex h-32 flex-row place-items-center content-center justify-center gap-2 bg-slate-800 text-center">
    {'Developed by: '}
    <a href="https://github.com/C3POrtillo">Cam</a>
  </div>
);

export default Footer;
