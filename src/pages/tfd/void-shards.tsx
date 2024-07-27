import React, { useEffect, useState } from 'react';

import type {
  VoidFragmentData,
  VoidFragmentFilterMap,
  VoidFragmentFilterTypes,
  shardsArray,
} from '@/components/void-fragments/types';
import type { FC } from 'react';

import Footer from '@/components/Footer/Footer';
import Container from '@/components/container/Container';
import Header from '@/components/header/TFDHeader';
import FilterOptions from '@/components/inputs/FilterOptions';
import VoidFragmentTable from '@/components/void-fragments/VoidFragmentTable';
import {
  attributesArray,
  fragmentOptions,
  subregionsArray,
  voidFragmentFilterKeys,
  zoneOptions,
  zonesArray,
} from '@/components/void-fragments/types';
import { deserializeZoneData } from '@/components/void-fragments/utils';
import { titleCase } from '@/utils/utils';

interface VoidShardProps {
  voidFragments: VoidFragmentData[];
}

const VoidShards: FC<VoidShardProps> = ({ voidFragments }) => {
  const [filteredRows, setFilteredRows] = useState([] as VoidFragmentData[]);
  const [filter, setFilter] = useState({} as VoidFragmentFilterMap);

  useEffect(() => {
    setFilteredRows(voidFragments);
    const defaultFilter = [...attributesArray, ...zonesArray, ...subregionsArray] as VoidFragmentFilterTypes[];
    const filterMap = defaultFilter.reduce((acc, key) => {
      acc[key] = true;

      return acc;
    }, {} as VoidFragmentFilterMap);

    setFilter(filterMap);
  }, []);

  useEffect(() => {
    const currentFilter = voidFragments.reduce((acc, fragment) => {
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
  }, [filter]);

  return (
    <>
      <Header />
      <Container className="w-7/12">
        <div className="fragment-data flex flex-row flex-wrap justify-center gap-4">
          <FilterOptions filterOptions={fragmentOptions} filter={filter} setState={setFilter} />
        </div>
        <div className="subregion-data flex flex-row flex-wrap justify-center gap-4">
          <FilterOptions filterOptions={zoneOptions} filter={filter} setState={setFilter} />
        </div>
      </Container>
      <Container>
        <VoidFragmentTable fragmentData={filteredRows} className="fragment-data subregion-data" />
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => ({
  props: {
    voidFragments: deserializeZoneData(),
  },
});

export default VoidShards;
