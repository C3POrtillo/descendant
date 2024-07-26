import React from 'react';

import type { WeaponData } from '@/utils/types';
import type { FC, TableHTMLAttributes } from 'react';

import WeaponRow from '@/components/weapon/WeaponRow';
import { weaponTableHeaders } from '@/utils/types';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  weaponData: WeaponData[];
}

const WeaponTable: FC<TableProps> = ({ weaponData, className, ...props }) => (
  <fieldset className={className}>
    <legend className="p-4 text-center text-5xl">Weapon DPS Chart</legend>
    <table className="w-full bg-slate-700" {...props}>
      <thead>
        <tr className="rounded-2xl bg-slate-700">
          {weaponTableHeaders.map(key => (
            <th key={key} className="w-full min-w-32 whitespace-pre-line bg-slate-600 text-xl">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weaponData.map(row => (
          <WeaponRow key={row.weapon_id} data={row} />
        ))}
      </tbody>
    </table>
  </fieldset>
);

export default WeaponTable;
