import type { DirectionValues } from '@/components/inputs/types';
import type { TableProps } from '@/components/table/Table';
import type { ShardsType, VoidFragmentData } from '@/components/void-fragments/types';
import type { FC } from 'react';

import Icon from '@/components/icon/Icon';
import Button from '@/components/inputs/Button/TableSortButton';
import Table from '@/components/table/Table';
import VoidFragmentRow from '@/components/void-fragments/VoidFragmentRow';
import { shardsArray, shardsImages, voidFragmentTableHeaders } from '@/components/void-fragments/types';

interface VoidFragmentTableProps extends TableProps {
  fragmentData: VoidFragmentData[];
  sortDirection: DirectionValues;
  sortColumn: string;
  setSortDirection: React.Dispatch<React.SetStateAction<DirectionValues>>;
  setSortColumn: React.Dispatch<React.SetStateAction<string>>;
}

const VoidFragmentTable: FC<VoidFragmentTableProps> = ({
  fragmentData,
  sortDirection,
  sortColumn,
  setSortDirection,
  setSortColumn,
  ...props
}) => (
  <Table
    label="Void Fragment Locations"
    sublabel={<p className="mx-auto text-xl text-yellow-200">Fast locations marked in gold</p>}
    headers={voidFragmentTableHeaders.map(key => (
      <th key={key} className="text-3xl">
        <Button
          id={key}
          sortDirection={sortColumn === key ? sortDirection : 0}
          setSortDirection={setSortDirection}
          setSortColumn={setSortColumn}
        >
          {shardsArray.includes(key as ShardsType) ? (
            <div className="flex flex-row items-center justify-center gap-2">
              {<Icon src={shardsImages[key as ShardsType]} size="size-10" />}
              {key}
            </div>
          ) : (
            key
          )}
        </Button>
      </th>
    ))}
    body={fragmentData.map(data => (
      <VoidFragmentRow key={data.subregion} data={data} />
    ))}
    {...props}
  />
);

export default VoidFragmentTable;
