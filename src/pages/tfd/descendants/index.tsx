import Link from 'next/link';
import { type FC, useEffect, useState } from 'react';

import type {
  DescendantAPIData,
  DescendantFilterMap,
  FormattedDescendantData,
} from '@/components/tfd/descendants/types';
import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';

import Container from '@/components/container/Container';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import Text from '@/components/inputs/Text/Text';
import DescendantCard from '@/components/tfd/descendants/DescendantCard';
import { tierOptions } from '@/components/tfd/descendants/types';
import { formatDescendantData } from '@/components/tfd/descendants/utils';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import { attributeOptions, attributesArray } from '@/utils/attributes/types';
import { createFilterMap, kebabCase } from '@/utils/utils';

interface IndexProps {
  seo: NextSeoProps;
  descendants: FormattedDescendantData[];
  filterMap: DescendantFilterMap;
}

const Index: FC<IndexProps> = ({ seo, descendants, filterMap }) => {
  const [filteredDescendants, setFilteredDescendants] = useState(descendants);
  const [searchFilter, setSearchFilter] = useState('');
  const [filter, setFilter] = useState(filterMap);

  useEffect(() => {
    const currentFilter = descendants.reduce((acc, descendant) => {
      const isValidAttribute = filter[descendant.attribute];
      const isValidTier = descendant.is_ultimate ? filter['Ultimate'] : filter['Standard'];

      if (isValidAttribute && isValidTier) {
        acc.push(descendant);
      }

      return acc;
    }, [] as FormattedDescendantData[]);

    setFilteredDescendants(currentFilter);
  }, [filter]);

  useEffect(() => {
    const currentFilter = descendants.reduce((acc, descendant) => {
      const regex = new RegExp(searchFilter);

      if (!searchFilter || regex.test(descendant.descendant_name) || regex.test(descendant.attribute)) {
        acc.push(descendant);
      }

      return acc;
    }, [] as FormattedDescendantData[]);

    setFilteredDescendants(currentFilter);
  }, [searchFilter]);
  const descendantCards = filteredDescendants.map(descendant => (
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
        <div className="descendant-data flex flex-col justify-center gap-4 2xl:flex-row">
          <div className="2xl:sticky-below-header flex h-min flex-row justify-center gap-4 2xl:w-1/6 2xl:flex-col">
            <div className="mt-4 flex flex-row flex-wrap justify-center gap-4">
              <div className="rounded-md border-2 border-black bg-slate-900 p-2 shadow-md shadow-black">
                <Text label="Name/Attribute" setState={setSearchFilter} placeholder="Search..." />
              </div>
              <FilterOptions filterOptions={[attributeOptions, tierOptions]} filter={filter} setFilter={setFilter} />
            </div>
          </div>
          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
          <div className="mt-4 flex flex-row flex-wrap justify-center gap-4 2xl:min-w-[61vw] 2xl:max-w-[61vw]">
            {descendantCards}
          </div>
        </div>
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

  const filterMap = createFilterMap([...attributesArray, 'Standard', 'Ultimate']) as DescendantFilterMap;

  const descendants = (await (await fetch(process.env.DESCENDANT_JSON)).json()) as DescendantAPIData[];

  const title = 'The First Descendant (TFD) All Descendants';
  const description = `Tool for all Descendant data in The First Descendant (TFD). 
    Displays all descendants and their max stats at Lvl. 40`;

  return {
    props: {
      descendants: formatDescendantData(descendants),
      filterMap,
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
