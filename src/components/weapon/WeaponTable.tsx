import type { DirectionValues } from '@/components/inputs/types';
import type { TableProps } from '@/components/table/Table';
import type { FormattedWeaponData } from '@/components/weapon/types';
import type { FC } from 'react';

import Button from '@/components/inputs/Button/TableSortButton';
import Table from '@/components/table/Table';
import WeaponRow from '@/components/weapon/WeaponRow';
import { weaponTableHeaders } from '@/components/weapon/types';

interface WeaponTableProps extends TableProps {
  weaponData: FormattedWeaponData[];
  sortDirection: DirectionValues;
  sortColumn: string;
  setSortDirection: React.Dispatch<React.SetStateAction<DirectionValues>>;
  setSortColumn: React.Dispatch<React.SetStateAction<string>>;
}

const WeaponTable: FC<WeaponTableProps> = ({
  weaponData,
  sortDirection,
  sortColumn,
  setSortDirection,
  setSortColumn,
  ...props
}) => (
  <Table
    label="Weapon DPS Chart"
    headers={weaponTableHeaders.map(key => (
      <div key={key} className="text-base lg:text-xl">
        <Button
          id={key}
          sortDirection={sortColumn === key ? sortDirection : 0}
          setSortDirection={setSortDirection}
          setSortColumn={setSortColumn}
        >
          {key}
        </Button>
      </div>
    ))}
    body={weaponData.map(row => (
      <WeaponRow key={row.weapon_id} {...row} />
    ))}
    {...props}
  />
);

export default WeaponTable;
