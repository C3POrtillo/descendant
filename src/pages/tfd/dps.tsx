import axios from 'axios';
import Error from 'next/error';
import { useEffect, useState } from 'react';

import type { DirectionValues } from '@/components/inputs/types';
import type { FormattedWeaponData, WeaponFilterMap, WeaponFilterTypes } from '@/components/tfd/weapon/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import Table from '@/components/table/Table';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import WeaponHeaders from '@/components/tfd/weapon/WeaponHeaders';
import WeaponRow from '@/components/tfd/weapon/WeaponRow';
import { roundsArray, weaponArray, weaponFilterKeys, weaponOptions } from '@/components/tfd/weapon/types';
import { defaultWeaponSort, reformatWeaponData } from '@/components/tfd/weapon/utils';
import { tiers } from '@/utils/types';
import { camelCase, sortData } from '@/utils/utils';

interface WeaponDPSProps {
  error: boolean;
  filterMap: WeaponFilterMap;
  weapons: FormattedWeaponData[];
}

const WeaponDps: FC<WeaponDPSProps> = ({ error, filterMap, weapons }) => {
  const [filteredWeapons, setFilteredWeapons] = useState(weapons);
  const [filter, setFilter] = useState(filterMap);
  const [sortDirection, setSortDirection] = useState(0 as DirectionValues);
  const [sortColumn, setSortColumn] = useState('');
  const [isError] = useState(error || !weapons);

  useEffect(() => {
    if (isError) {
      return;
    }
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
      <Container className="weapon-data flex w-full flex-col justify-center gap-4 2xl:w-2/3 2xl:flex-row">
        <FilterOptions filterOptions={weaponOptions} filter={filter} setFilter={setFilter} />
      </Container>
      <Container>
        <Table
          label="Weapon DPS Chart"
          headers={WeaponHeaders()}
          body={filteredWeapons.map(row => (
            <WeaponRow key={row.weapon_id} {...row} />
          ))}
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

  const defaultFilter = [...tiers, ...roundsArray, ...weaponArray] as WeaponFilterTypes[];
  const filterMap = defaultFilter.reduce((acc, key) => {
    acc[key] = true;

    return acc;
  }, {} as WeaponFilterMap);

  return {
    props: {
      filterMap,
      weapons: reformatWeaponData(weapons.sort(defaultWeaponSort)),
    },
    revalidate: 86400,
  };
};

export default WeaponDps;
