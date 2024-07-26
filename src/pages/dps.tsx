import axios from 'axios';
import Error from 'next/error';
import React, { useEffect, useState } from 'react';

import type { FilterMap, FilterTypes, WeaponData } from '@/utils/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Header from '@/components/header/Header';
import MultiCheckbox from '@/components/inputs/MultiCheckbox';
import WeaponTable from '@/components/weapon/WeaponTable';
import { roundsArray, tiersArray, weaponArray, weaponFilterKeys } from '@/utils/types';
import { defaultWeaponSort, stringCompare } from '@/utils/utils';

interface WeaponDPSProps {
  error: boolean;
  weapons: WeaponData[];
}

const WeaponDps: FC<WeaponDPSProps> = ({ error, weapons }) => {
  const [filteredWeapons, setFilteredWeapons] = useState([] as WeaponData[]);
  const [filter, setFilter] = useState({} as FilterMap);
  const [isError] = useState(error || !weapons);

  useEffect(() => {
    if (isError) {
      return;
    }

    setFilteredWeapons(weapons);
    const defaultFilter = [...tiersArray, ...roundsArray, ...weaponArray] as FilterTypes[];
    const filterMap = defaultFilter.reduce((acc, key) => {
      acc[key] = true;

      return acc;
    }, {} as FilterMap);

    setFilter(filterMap);
  }, []);

  useEffect(() => {
    const currentFilter = weapons.reduce((acc, weapon) => {
      const validWeapon = weaponFilterKeys.every(key => filter[weapon[key]]) 
      if (validWeapon) {
        acc.push(weapon)
      }

      return acc
    },[] as WeaponData[])
    
    setFilteredWeapons(currentFilter)
  }, [filter])

  if (isError) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Header heading="" />
      <Container>
        {/* eslint-disable-next-line tailwindcss/no-arbitrary-value*/}
        <div className="flex max-w-[80%] flex-row gap-4">
          <MultiCheckbox
            label="Tier"
            name="weapon-tier"
            data={[...tiersArray]}
            defaultSelect="all"
            filter={filter}
            setState={setFilter}
          />
          <MultiCheckbox
            label="Rounds"
            name="rounds-type"
            data={[...roundsArray]}
            defaultSelect="all"
            filter={filter}
            setState={setFilter}
          />
          <MultiCheckbox
            label="Type"
            name="weapon-type"
            data={[...weaponArray.sort(stringCompare)]}
            filter={filter}
            defaultSelect="all"
            setState={setFilter}
          />
        </div>
      </Container>
      <Container>
        <WeaponTable weaponData={filteredWeapons} className="flex w-4/5 text-2xl" />
      </Container>
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

  return {
    props: {
      weapons: weapons.sort(defaultWeaponSort),
    },
  };
};

export default WeaponDps;
