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
import Table from '@/components/table/Table';
import VoidFragmentHeaders from '@/components/void-fragments/VoidFragmentHeaders';
import VoidFragmentRow from '@/components/void-fragments/VoidFragmentRow';
import {
  fragmentOptions,
  subregionsArray,
  voidFragmentFilterKeys,
  zoneOptions,
  zonesArray,
} from '@/components/void-fragments/types';
import { reformatZoneData } from '@/components/void-fragments/utils';
import { attributesArray } from '@/utils/attributes/types';
import use2xlScreen from '@/utils/useLargeScreen';
import { sortData, titleCase } from '@/utils/utils';

interface VoidShardProps {
  filterMap: VoidFragmentFilterMap;
  voidFragments: VoidFragmentData[];
}

const VoidShards: FC<VoidShardProps> = ({ filterMap, voidFragments }) => {
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
      <Header />
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

export const getStaticProps = async () => {
  const voidFragments = reformatZoneData();

  const defaultFilter = [...attributesArray, ...zonesArray, ...subregionsArray] as VoidFragmentFilterTypes[];
  const filterMap = defaultFilter.reduce((acc, key) => {
    acc[key] = true;

    return acc;
  }, {} as VoidFragmentFilterMap);

  return {
    props: {
      filterMap,
      voidFragments,
    },
  };
};

export default VoidShards;
