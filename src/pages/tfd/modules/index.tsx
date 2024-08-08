import type { ModuleAPIData } from '@/components/tfd/module/types';
import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import ModuleCard from '@/components/tfd/module/ModuleCard';

interface IndexProps {
  seo: NextSeoProps;
  modules: ModuleAPIData[];
}

const Index: FC<IndexProps> = ({ seo, modules }) => {
  const moduleCards = modules.map(module => (
    <div key={module.module_id}>
      <ModuleCard {...module} />
    </div>
  ));

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="module-data flex flex-row flex-wrap justify-center gap-x-4 gap-y-8">
          {moduleCards}
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

  const title = 'The First Descendant (TFD) All Module Data';
  const description = `Tool for all module data in The First Descendant (TFD). 
    Displays all modules and their stats at every level`;

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
