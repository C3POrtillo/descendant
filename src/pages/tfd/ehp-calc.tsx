import type { FC } from 'react';

import Container from '@/components/container/Container';
import Calculator from '@/components/tfd/ehp-calc/Calculator';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';

const EhpCalc: FC = () => (
  <>
    <Header />
    <Container>
      <fieldset className="flex flex-row gap-4 rounded-xl border-2 border-solid border-white bg-slate-900 p-4 text-3xl shadow-xl shadow-black">
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

export default EhpCalc;
