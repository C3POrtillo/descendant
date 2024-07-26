import React from 'react';


import type { WeaponData } from '@/components/weapon/types';
import type { FC, TableHTMLAttributes } from 'react';

import Table from '@/components/table/Table';
import WeaponRow from '@/components/weapon/WeaponRow';
import { weaponTableHeaders } from '@/components/weapon/types';

interface WeaponTableProps extends TableHTMLAttributes<HTMLTableElement> {
  weaponData: WeaponData[];
}

const WeaponTable: FC<WeaponTableProps> = ({ weaponData, ...props }) => (
  <Table label="Weapon DPS Chart" headers={weaponTableHeaders.map(key => (
    <th key={key} className="w-full min-w-32 whitespace-pre-line bg-slate-600 text-xl">
      {key}
    </th>
  ))} body={weaponData.map(row => (
    <WeaponRow key={row.weapon_id} data={row} />
  ))} {...props}/>
  
);

export default WeaponTable;
