import Error from 'next/error';
import { useEffect, useState } from 'react';

import type { DirectionValues } from '@/components/inputs/types';
import type { FormattedWeaponData, WeaponFilterMap, WeaponFilterTypes } from '@/components/tfd/weapon/types';
import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import Table from '@/components/table/Table';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import WeaponHeaders from '@/components/tfd/weapon/WeaponHeaders';
import WeaponRow from '@/components/tfd/weapon/WeaponRow';
import { roundsArray, weaponArray, weaponFilterKeys, weaponOptions } from '@/components/tfd/weapon/types';
import { reformatWeaponData } from '@/components/tfd/weapon/utils';
import { tiers } from '@/utils/types';
import { camelCase, createFilterMap, sortData } from '@/utils/utils';

interface WeaponDPSProps {
  error: boolean;
  filterMap: WeaponFilterMap;
  weapons: FormattedWeaponData[];
  seo: NextSeoProps;
}

const WeaponDps: FC<WeaponDPSProps> = ({ error, filterMap, weapons, seo }) => {
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
      <Header seo={seo} />
      <Container className="weapon-data">
        <div className=" flex flex-col justify-center gap-4 2xl:flex-row">
          <FilterOptions filterOptions={weaponOptions} filter={filter} setFilter={setFilter} />
        </div>
      </Container>
      <Container className="weapon-data">
        <Table
          label="Weapon DPS Chart"
          headers={WeaponHeaders()}
          body={filteredWeapons.map(row => (
            <WeaponRow key={row.weapon_id} {...row} />
          ))}
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          setSortDirection={setSortDirection}
          setSortColumn={setSortColumn}
          isStickyHeader={true}
          isColumnSticky={true}
        />
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = (async () => {
  if (!process.env.WEAPON_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const weapons = await (await fetch(process.env.WEAPON_JSON)).json();

  const defaultFilter = [...tiers, ...roundsArray, ...weaponArray] as WeaponFilterTypes[];
  const filterMap = createFilterMap(defaultFilter) as WeaponFilterMap;

  const title = 'The First Descendant (TFD) Weapon DPS';
  const description = `Tool for filtering and sorting weapons in The First Descendant (TFD).
    Filters weapons by rarity, rounds, weapon type. 
    Sorts by Firearm attack (ATK), Magazine Size (Rounds per Magazine), Fire Rate, 
    Critical Hit Chance, Critical Hit Damage, Weak Point Damage, Reload Time, Status Chance, 
    Damage per second (DPS), Critical DPS, Critical with Weak Point DPS`;

  return {
    props: {
      filterMap,
      weapons: reformatWeaponData(weapons),
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/dps',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
    revalidate: 86400,
  };
}) satisfies GetStaticProps;

export default WeaponDps;
