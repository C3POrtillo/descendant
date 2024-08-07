import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Calculator from '@/components/tfd/ehp-calc/Calculator';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';

interface EhpCalcProps {
  seo: NextSeoProps;
}

const EhpCalc: FC<EhpCalcProps> = ({ seo }) => (
  <>
    <Header seo={seo} />
    <Container>
      <fieldset className="flex flex-row gap-4 rounded-xl border-2 border-white bg-slate-900 p-4 text-3xl shadow-xl shadow-black">
        <legend className="mx-auto p-4 text-center text-3xl md:text-4xl">
          <h2>Effective HP Comparison</h2>
        </legend>
        <Calculator />
        <Calculator />
      </fieldset>
    </Container>
    <Footer />
  </>
);

export const getStaticProps = async () => {
  const title = 'The First Descendant (TFD) Effective Health Points (EHP) Calculator';
  const description = 'Tool for calculating effective health points (ehp) in The First Descendant (TFD)';

  return {
    props: {
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/ehp-calc',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
  };
};

export default EhpCalc;
