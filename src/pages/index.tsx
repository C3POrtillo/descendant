import Script from 'next/script';
import React from 'react';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import Socials from '@/components/socials/Socials';


const Index: FC = () => (
  <>
    <Script async src="https://kit.fontawesome.com/ce4be88325.js"/>
    <Container className="flex size-full flex-col items-center justify-center align-middle">
      <h1 className="text-8xl font-normal text-blue-400">cam</h1>
      <Socials/>
    </Container>
  </>
);

export default Index;
