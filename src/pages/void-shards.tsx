import React, { useEffect, useState } from 'react';

import type { FilterMap } from '@/components/weapon/types';
import type { FC } from 'react';

import Footer from '@/components/Footer/Footer';
import Container from '@/components/container/Container';
import Header from '@/components/header/Header';
import FilterOptions from '@/components/inputs/FilterOptions';
import VoidFragmentTable from '@/components/void-fragments/VoidFragmentTable';
import { fragmentOptions, zoneOptions } from '@/components/void-fragments/types';

const VoidShards: FC = () => {
  // const [filteredWeapons, setFilteredWeapons] = useState([] as WeaponData[]);
  const [filter, setFilter] = useState({} as FilterMap);

  // useEffect(() => {}, []);

  // useEffect(() => {}, [filter]);

  return (
    <>
      <Header />
      <Container>
        <div className="fragment-data flex flex-row flex-wrap justify-center gap-4">
          <FilterOptions filterOptions={fragmentOptions} filter={filter} setState={setFilter} />
        </div>
        <div className="subregion-data flex flex-row flex-wrap justify-center gap-4">
          <FilterOptions filterOptions={zoneOptions} filter={filter} setState={setFilter} />
        </div>
      </Container>
      <Container>
        <VoidFragmentTable className="fragment-data subregion-data" />
      </Container>
      <Footer />
    </>
  );
};

export default VoidShards;
