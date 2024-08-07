import axios from 'axios';

import type { DescendantAPIData, FormattedDescendantData } from '@/components/tfd/descendants/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import DescendantCard from '@/components/tfd/descendants/DescendantCard';
import { formatDescendantData } from '@/components/tfd/descendants/utils';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';

interface IndexProps {
  seo: NextSeoProps;
  descendants: FormattedDescendantData[];
}

const Index: FC<IndexProps> = ({ seo, descendants }) => {
  console.log(descendants);

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="descendant-data grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {descendants.map(descendant => (
            <DescendantCard key={descendant.descendant_id} {...descendant} />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  if (!process.env.DESCENDANT_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const descendants = (await axios.get(process.env.DESCENDANT_JSON)).data as DescendantAPIData[];

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
};

export default Index;
