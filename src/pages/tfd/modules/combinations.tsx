import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import ModuleCombinationTable from '@/components/tfd/module/ModuleCombinationTable';

interface IndexProps {
  seo: NextSeoProps;
}

const Index: FC<IndexProps> = ({ seo }) => (
  <>
    <Header seo={seo} />
    <Container>
      <ModuleCombinationTable />
    </Container>
    <Footer />
  </>
);

export const getStaticProps = (async () => {
  const title = 'The First Descendant (TFD) Module Combinations';
  const description = `Tool for module combos in The First Descendant (TFD). 
    Displays all combinations of rarities and the probability of their results`;

  return {
    props: {
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/modules/combinations',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
  };
}) satisfies GetStaticProps;

export default Index;
