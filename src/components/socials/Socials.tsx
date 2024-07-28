import Link from 'next/link';
import React from 'react';

import type { FC } from 'react';

import parseUrl from '@/utils/parseUrl';
import { socials } from '@/utils/types';

const Socials: FC = () => (
  <div className="social flex flex-row items-center gap-4">
    {socials.map(({ site, href }) => (
      <Link
        key={site}
        {...parseUrl(href)}
        className="social size-12 px-1 no-underline"
        rel="noreferrer"
        target="_blank"
      >
        <i className={['before:text-5xl fab', `fa-${site}`].join(' ')} />
      </Link>
    ))}
  </div>
);

export default Socials;
