import type { ModuleAPIData, ModuleTiersType } from '@/components/tfd/module/types';
import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import ModuleCosts from '@/components/tfd/module/ModuleCosts';
import { kuiperCosts } from '@/components/tfd/module/types';

interface IndexProps {
  seo: NextSeoProps;
}

const Index: FC<IndexProps> = ({ seo }) => {
  const moduleCosts = [
    Object.entries(kuiperCosts).map(([label, costs]) => (
      <ModuleCosts key={label} label={label as ModuleTiersType} kuiperPerLevel={costs} />
    )),
  ];

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="module-data grid grid-cols-1 justify-center gap-3 lg:grid-cols-2 2xl:grid-cols-4">
          {moduleCosts}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = (async () => {
  if (!process.env.MODULE_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const modules = (await (await fetch(process.env.MODULE_JSON)).json()) as ModuleAPIData[];

  const title = 'The First Descendant (TFD) Module Costs';
  const description = `Tool for module costs in The First Descendant (TFD). 
    Displays all module tiers, their kuiper/gold cost per level and total kuiper/gold cost per level`;

  return {
    props: {
      modules,
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/descendants',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
  };
}) satisfies GetStaticProps;

export default Index;