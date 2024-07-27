/* eslint-disable tailwindcss/no-custom-classname */
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import parseUrl from '@/utils/parseUrl';
import { socials } from '@/utils/types';

const Index: FC = () => (
  <>
    <Head>
      <script async src="https://kit.fontawesome.com/ce4be88325.js"></script>
    </Head>
    <Container className="flex size-full flex-col items-center justify-center align-middle">
      <h1 className="text-8xl font-normal text-blue-400">cam</h1>
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
    </Container>
  </>
);

export default Index;
