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
        <p>Fix Blair/Freyna/Sharen/Bunny Pattern Drops</p>
        <p>Module Data</p>
        <p>Weapon Builder @ 100 w/ accurate DPS</p>
      </div>
    </Container>
    <Footer />
  </>
);

export const getStaticProps = async () => {
  const title = 'The First Descendant (TFD) Assistant';
  const description = `Tools/Helper site for The First Descendant (TFD). 
    Features: Pattern Wishlist, Void Shard/Void Fragment Data, Weapon DPS Data, 
    Effective Health Points (EHP) Calculator, External Component Data. Descendant Data.`;

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
