import Link from 'next/link';

import type { DescendantAPIData, FormattedDescendantData } from '@/components/tfd/descendants/types';
import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import DescendantCard from '@/components/tfd/descendants/DescendantCard';
import { formatDescendantData } from '@/components/tfd/descendants/utils';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import { kebabCase } from '@/utils/utils';

interface IndexProps {
  seo: NextSeoProps;
  descendants: FormattedDescendantData[];
}

const Index: FC<IndexProps> = ({ seo, descendants }) => {
  const descendantCards = descendants.map(descendant => (
    <Link
      key={descendant.descendant_id}
      href={`/tfd/descendants/${kebabCase(descendant.descendant_name)}`}
      className="input-hover"
    >
      <DescendantCard {...descendant} />
    </Link>
  ));

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="descendant-data flex flex-row flex-wrap justify-center gap-4">{descendantCards}</div>
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = (async () => {
  if (!process.env.DESCENDANT_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const descendants = (await (await fetch(process.env.DESCENDANT_JSON)).json()) as DescendantAPIData[];

  const title = 'The First Descendant (TFD) Descendants Data';
  const description = `Tool for Descendant data in The First Descendant (TFD). 
    Displays all descendants and their max stats at Lvl. 40`;

  return {
    props: {
      descendants: formatDescendantData(descendants),
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
