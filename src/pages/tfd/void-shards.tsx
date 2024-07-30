import { useEffect, useState } from 'react';

import type { DirectionValues } from '@/components/inputs/types';
import type {
  FilterTypes,
  VoidFragmentData,
  VoidFragmentFilterMap,
  VoidFragmentFilterTypes,
  shardsArray,
} from '@/components/void-fragments/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import VoidFragmentTable from '@/components/void-fragments/VoidFragmentTable';
import {
  fragmentOptions,
  subregionsArray,
  voidFragmentFilterKeys,
  zoneOptions,
  zonesArray,
} from '@/components/void-fragments/types';
import { reformatZoneData } from '@/components/void-fragments/utils';
import { attributesArray } from '@/utils/attributes/types';
import { sortData, titleCase } from '@/utils/utils';

interface VoidShardProps {
  voidFragments: VoidFragmentData[];
}

const VoidShards: FC<VoidShardProps> = ({ voidFragments }) => {
  const [filteredRows, setFilteredRows] = useState(voidFragments);
  const [filter, setFilter] = useState({} as VoidFragmentFilterMap);
  const [sortDirection, setSortDirection] = useState(0 as DirectionValues);
  const [sortColumn, setSortColumn] = useState('');

  useEffect(() => {
    const defaultFilter = [...attributesArray, ...zonesArray, ...subregionsArray] as VoidFragmentFilterTypes[];
    const filterMap = defaultFilter.reduce((acc, key) => {
      acc[key] = true;

      return acc;
    }, {} as VoidFragmentFilterMap);

    setFilter(filterMap);
  }, []);

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
      <Header />
      <Container className="fragment-data subregion-data hidden w-full flex-col 2xl:flex 2xl:w-3/4 2xl:flex-row">
        <div className="flex h-min flex-row flex-wrap justify-center gap-4">
          <FilterOptions filterOptions={fragmentOptions} filter={filter} setFilter={setFilter} />
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <FilterOptions filterOptions={zoneOptions} filter={filter} setFilter={setFilter} />
        </div>
      </Container>

      <Container className="fragment-data subregion-data flex flex-row flex-wrap 2xl:hidden">
        <FilterOptions filterOptions={[...fragmentOptions, zoneOptions[0]]} filter={filter} setFilter={setFilter}/>
        <FilterOptions filterOptions={[...zoneOptions.slice(1)]} filter={filter} setFilter={setFilter} type="carousel"/>
      </Container>
      <Container>
        <VoidFragmentTable
          fragmentData={filteredRows}
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

export const getStaticProps = async () => {
  const voidFragments = reformatZoneData();

  return {
    props: {
      voidFragments,
    },
  };
};

export default VoidShards;
