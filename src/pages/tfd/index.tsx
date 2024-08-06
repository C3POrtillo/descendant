import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';

interface IndexProps {
  seo: NextSeoProps;
}

const Index: FC<IndexProps> = ({ seo }) => (
  <>
    <Header seo={seo} />
    <Container>
      <div className="flex flex-col justify-center text-center text-lg">
        <h2 className="text-2xl">to-do (by easiest)</h2>
        <p>Descendant Data @ 40 w/ pattern data</p>
        <p>Module Data</p>
        <p>Weapon Builder @ 100 w/ accurate DPS</p>
      </div>
    </Container>
    <Footer />
  </>
);

export const getStaticProps = async () => {
  const title = 'The First Descendant (TFD) Helper Site';
  const description = `A helper website for The First Descendant (TFD). 
    Contains tools for Pattern Wishlist, Void Shard/Void Fragment Data, Weapon DPS Data, 
    Effective Health Points (EHP) Calculator, External Component Data.`;

  return {
    props: {
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
  };
};

export default Index;
