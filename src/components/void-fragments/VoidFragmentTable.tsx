import React from 'react';

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
}

const VoidFragmentTable: FC<VoidFragmentTableProps> = ({ fragmentData, ...props }) => (
  <Table
    label="Void Fragment Locations"
    headers={voidFragmentTableHeaders.map(key => (
      <th key={key} className="text-3xl">
        <Button>{shardsArray.includes(key as ShardsType)? 
          <div className="flex flex-row items-center justify-center gap-2">
            {<Icon src={shardsImages[key as ShardsType]}/>}
            {key}
          </div>
          : key}</Button>
      </th>
    ))}
    body={fragmentData.map(data => (
      <VoidFragmentRow key={data.subregion} data={data} />
    ))}
    {...props}
  />
);

export default VoidFragmentTable;
