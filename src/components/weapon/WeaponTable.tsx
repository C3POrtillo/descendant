import React from 'react';

import type { TableProps } from '@/components/table/Table';
import type { WeaponData } from '@/components/weapon/types';
import type { FC } from 'react';

import Table from '@/components/table/Table';
import WeaponRow from '@/components/weapon/WeaponRow';
import { weaponTableHeaders } from '@/components/weapon/types';

interface WeaponTableProps extends TableProps {
  weaponData: WeaponData[];
}

const WeaponTable: FC<WeaponTableProps> = ({ weaponData, ...props }) => (
  <Table
    label="Weapon DPS Chart"
    headers={weaponTableHeaders.map(key => (
      <th key={key} className="min-w-32 whitespace-pre-line bg-slate-600 px-2 py-4 text-xl">
        {key}
      </th>
    ))}
    body={weaponData.map(row => (
      <WeaponRow key={row.weapon_id} data={row} />
    ))}
    {...props}
  />
);

export default WeaponTable;
