import axios from 'axios';
import Error from 'next/error';
import React, { useEffect, useState } from 'react';

import type { WeaponData, WeaponFilterMap, WeaponFilterTypes } from '@/components/weapon/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/TFDHeader';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import WeaponTable from '@/components/weapon/WeaponTable';
import { roundsArray, tiers, weaponArray, weaponFilterKeys, weaponOptions } from '@/components/weapon/types';
import { defaultWeaponSort } from '@/utils/utils';

interface WeaponDPSProps {
  error: boolean;
  weapons: WeaponData[];
}

const WeaponDps: FC<WeaponDPSProps> = ({ error, weapons }) => {
  const [filteredWeapons, setFilteredWeapons] = useState([] as WeaponData[]);
  const [filter, setFilter] = useState({} as WeaponFilterMap);
  const [isError] = useState(error || !weapons);

  useEffect(() => {
    if (isError) {
      return;
    }

    setFilteredWeapons(weapons);
    const defaultFilter = [...tiers, ...roundsArray, ...weaponArray] as WeaponFilterTypes[];
    const filterMap = defaultFilter.reduce((acc, key) => {
      acc[key] = true;

      return acc;
    }, {} as WeaponFilterMap);

    setFilter(filterMap);
  }, []);

  useEffect(() => {
    const currentFilter = weapons.reduce((acc, weapon) => {
      const validWeapon = weaponFilterKeys.every(key => filter[weapon[key]]);
      if (validWeapon) {
        acc.push(weapon);
      }

      return acc;
    }, [] as WeaponData[]);

    setFilteredWeapons(currentFilter);
  }, [filter]);

  if (isError) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Header />
      <Container>
        <div className="weapon-data flex flex-row justify-center gap-4">
          <FilterOptions filterOptions={weaponOptions} filter={filter} setState={setFilter} />
        </div>
      </Container>
      <Container>
        <WeaponTable weaponData={filteredWeapons} className="weapon-data" />
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  if (!process.env.WEAPON_JSON || !process.env.STAT_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const weapons = (await axios.get(process.env.WEAPON_JSON)).data;
  console.log(weapons[0]);

  return {
    props: {
      weapons: weapons.sort(defaultWeaponSort),
    },
  };
};

export default WeaponDps;
