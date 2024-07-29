import axios from 'axios';
import Error from 'next/error';
import { useEffect, useState } from 'react';

import type { DirectionValues } from '@/components/inputs/types';
import type { FormattedWeaponData, WeaponFilterMap, WeaponFilterTypes } from '@/components/weapon/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import WeaponTable from '@/components/weapon/WeaponTable';
import { roundsArray, weaponArray, weaponFilterKeys, weaponOptions } from '@/components/weapon/types';
import { defaultWeaponSort, reformatWeaponData } from '@/components/weapon/utils';
import { tiers } from '@/utils/types';
import { camelCase, sortData } from '@/utils/utils';

interface WeaponDPSProps {
  error: boolean;
  weapons: FormattedWeaponData[];
}

const WeaponDps: FC<WeaponDPSProps> = ({ error, weapons }) => {
  const [filteredWeapons, setFilteredWeapons] = useState([] as FormattedWeaponData[]);
  const [filter, setFilter] = useState({} as WeaponFilterMap);
  const [sortDirection, setSortDirection] = useState(0 as DirectionValues);
  const [sortColumn, setSortColumn] = useState('');
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
    const sortKey = camelCase(sortColumn) as unknown as keyof FormattedWeaponData;

    const statSort = () => {
      if ((sortKey as string) === 'weaponLvl100' && sortDirection === 2) {
        return [...weapons].reverse();
      }

      return [...weapons].sort((a, b) => sortData(a[sortKey], b[sortKey], sortDirection));
    };

    const sortedWeapons = sortDirection !== 0 ? statSort() : weapons;

    const currentFilter = sortedWeapons.reduce((acc, weapon) => {
      const validWeapon = weaponFilterKeys.every(key => filter[weapon[key]]);
      if (validWeapon) {
        acc.push(weapon);
      }

      return acc;
    }, [] as FormattedWeaponData[]);

    setFilteredWeapons(currentFilter);
  }, [filter, sortDirection, sortColumn]);

  if (isError) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Header />
      <Container>
        <div className="weapon-data flex flex-row justify-center gap-4">
          <FilterOptions filterOptions={weaponOptions} filter={filter} setFilter={setFilter} />
        </div>
      </Container>
      <Container>
        <WeaponTable
          weaponData={filteredWeapons}
          className="weapon-data"
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
  if (!process.env.WEAPON_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const weapons = (await axios.get(process.env.WEAPON_JSON)).data;

  return {
    props: {
      weapons: reformatWeaponData(weapons.sort(defaultWeaponSort)),
    },
  };
};

export default WeaponDps;
