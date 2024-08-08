import { useEffect, useState } from 'react';

import type { DirectionValues } from '@/components/inputs/types';
import type {
  FilterTypes,
  VoidFragmentData,
  VoidFragmentFilterMap,
  VoidFragmentFilterTypes,
  shardsArray,
} from '@/components/tfd/void-fragments/types';
import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import Table from '@/components/table/Table';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import VoidFragmentHeaders from '@/components/tfd/void-fragments/VoidFragmentHeaders';
import VoidFragmentRow from '@/components/tfd/void-fragments/VoidFragmentRow';
import {
  fragmentOptions,
  subregionsArray,
  voidFragmentFilterKeys,
  zoneOptions,
  zonesArray,
} from '@/components/tfd/void-fragments/types';
import { reformatZoneData } from '@/components/tfd/void-fragments/utils';
import { attributesArray } from '@/utils/attributes/types';
import use2xlScreen from '@/utils/useLargeScreen';
import { createFilterMap, sortData, titleCase } from '@/utils/utils';

interface VoidShardsProps {
  filterMap: VoidFragmentFilterMap;
  voidFragments: VoidFragmentData[];
  seo: NextSeoProps;
}

const VoidShards: FC<VoidShardsProps> = ({ filterMap, voidFragments, seo }) => {
  const isLargeScreen = use2xlScreen();
  const [filteredRows, setFilteredRows] = useState(voidFragments);
  const [filter, setFilter] = useState(filterMap);
  const [sortDirection, setSortDirection] = useState(0 as DirectionValues);
  const [sortColumn, setSortColumn] = useState('');

  useEffect(() => {
    const sortKey = sortColumn.toLowerCase() as FilterTypes;
    const sortedFragments =
      sortDirection !== 0
        ? [...voidFragments].sort((a, b) => sortData(a[sortKey], b[sortKey], sortDirection))
        : voidFragments;

    const currentFilter = sortedFragments.reduce((acc, fragment) => {
      const validFragment = voidFragmentFilterKeys.every(key => {
        switch (key) {
          case 'monomer':
          case 'polymer':
          case 'organic':
          case 'inorganic':
            return !filter[titleCase(key) as (typeof shardsArray)[number]] || (fragment[key] as number) > 0;
          default:
            return filter[fragment[key] as VoidFragmentFilterTypes];
        }
      });

      if (validFragment) {
        acc.push(fragment);
      }

      return acc;
    }, [] as VoidFragmentData[]);

    setFilteredRows(currentFilter);
  }, [filter, sortDirection, sortColumn]);

  return (
    <>
      <Header seo={seo} />
      {isLargeScreen ? (
        <Container className="fragment-data subregion-data flex w-3/4 flex-row">
          <div className="flex h-min flex-row flex-wrap justify-center gap-4">
            <FilterOptions filterOptions={fragmentOptions} filter={filter} setFilter={setFilter} />
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            <FilterOptions filterOptions={zoneOptions} filter={filter} setFilter={setFilter} />
          </div>
        </Container>
      ) : (
        <Container className="fragment-data subregion-data flex flex-row flex-wrap">
          <FilterOptions filterOptions={[...fragmentOptions, zoneOptions[0]]} filter={filter} setFilter={setFilter} />
          <FilterOptions
            filterOptions={[...zoneOptions.slice(1)]}
            filter={filter}
            setFilter={setFilter}
            type="carousel"
          />
        </Container>
      )}
      <Container>
        <Table
          label="Void Fragment Locations"
          sublabel={<p className="pb-2 text-center text-xl text-yellow-200">Fast locations marked in gold</p>}
          headers={VoidFragmentHeaders()}
          body={filteredRows.map(data => (
            <VoidFragmentRow key={data.subregion} data={data} />
          ))}
          className="fragment-data subregion-data"
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          setSortDirection={setSortDirection}
          setSortColumn={setSortColumn}
          isSticky={true}
        />
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = (async () => {
  const voidFragments = reformatZoneData();

  const defaultFilter = [...attributesArray, ...zonesArray, ...subregionsArray] as VoidFragmentFilterTypes[];
  const filterMap = createFilterMap(defaultFilter) as VoidFragmentFilterMap;

  const title = 'The First Descendant (TFD) Void Shards/Fragments';
  const description = `Tool for filtering or sorting Void Fragment missions in The First Descedant (TFD). 
    Filters missions based on location, attributes, and shard type.`;

  return {
    props: {
      filterMap,
      voidFragments,
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/void-shards',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
  };
}) satisfies GetStaticProps;

export default VoidShards;
