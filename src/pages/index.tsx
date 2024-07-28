import React from 'react';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import Socials from '@/components/socials/Socials';

const Index: FC = () => (
  <>
    <Container className="m-0 flex size-full max-w-full flex-col items-center justify-center bg-slate-800 align-middle">
      <h1 className="text-9xl font-normal text-blue-400">cam</h1>
      <Socials />
    </Container>
  </>
);

export default Index;
