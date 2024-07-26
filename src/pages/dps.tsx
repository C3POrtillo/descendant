import axios from 'axios';
import Error from 'next/error';
import React from 'react';

import type { WeaponData } from '@/utils/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Header from '@/components/header/Header';
import WeaponTable from '@/components/weapon/WeaponTable';
import { defaultWeaponSort } from '@/utils/utils';

interface WeaponDPSProps {
  error: boolean;
  weapons: WeaponData[];
}

const WeaponDps: FC<WeaponDPSProps> = ({ error, weapons }) => {
  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Header heading="Weapon DPS Chart" />
      <Container>
        <WeaponTable weaponData={weapons.sort(defaultWeaponSort)} className="w-4/5" />
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
      weapons,
    },
  };
};

export default WeaponDps;
