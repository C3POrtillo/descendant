import { NextSeo } from 'next-seo';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import Socials from '@/components/socials/Socials';

const Index: FC = () => (
  <>
    <NextSeo
      title="Cam Ortillo"
      description="Personal site for Cam Ortillo"
      openGraph={{
        url: 'https://ortillo.cam',
        title: 'Cam Ortillo',
        description: 'Personal site for Cam Ortillo',
        images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
      }}
    />
    <Container className="m-0 flex size-full max-w-full flex-col items-center justify-center self-center bg-slate-800 align-middle">
      <h1 className="text-9xl font-normal text-blue-400">cam</h1>
      <Socials />
    </Container>
  </>
);

export default Index;
