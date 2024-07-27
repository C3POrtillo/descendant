import React from 'react';

import type { TableProps } from '@/components/table/Table';
import type { WeaponData } from '@/components/weapon/types';
import type { FC } from 'react';

import Button from '@/components/inputs/Button/TableSortButton';
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
      <th key={key} className="text-xl">
        <Button>{key}</Button>
      </th>
    ))}
    body={weaponData.map(row => (
      <WeaponRow key={row.weapon_id} data={row} />
    ))}
    {...props}
  />
);

export default WeaponTable;
