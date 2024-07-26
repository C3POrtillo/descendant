import React from 'react';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import Header from '@/components/header/Header';

const Index: FC = () => (
  <>
    <Header/>
    <Container>{':)'}</Container>
  </>
);

export default Index;
