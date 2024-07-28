import type { FC } from 'react';

import Container from '@/components/container/Container';
import Calculator from '@/components/ehp-calc/Calculator';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';

const EhpCalc: FC = () => (
  <>
    <Header />
    <Container>
      <fieldset className="flex flex-row gap-4 rounded-xl border-2 border-solid border-white bg-slate-900 p-4 text-3xl shadow-xl shadow-black">
        <legend className="mx-auto p-4 text-center text-4xl">Effective HP Comparison</legend>
        <Calculator />
        <Calculator />
      </fieldset>
    </Container>
    <Footer />
  </>
);

export default EhpCalc;
