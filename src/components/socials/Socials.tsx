/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';
import React from 'react';

import type { FC } from 'react';

import parseUrl from '@/utils/parseUrl';
import { socials } from '@/utils/types';

const Socials: FC = () => (
  <div className="social flex flex-row gap-4">
    {socials.map(({ site, href }) => (
      <Link
        key={site}
        {...parseUrl(href)}
        className={`social size-12 px-1 no-underline ${site}`}
        rel="noreferrer"
        target="_blank"
      >
        <i className={`fab fa-${site}`} />
      </Link>
    ))}
  </div>
);

export default Socials;
