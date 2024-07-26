import React from 'react';

import type { TableProps } from '@/components/table/Table';
import type { FC } from 'react';

import Table from '@/components/table/Table';
import VoidFragmentRow from '@/components/void-fragments/VoidFragmentRow';
import { voidFragmentTableHeaders } from '@/components/void-fragments/types';
import { deserializeZoneData } from '@/components/void-fragments/utils';

const VoidFragmentTable: FC<TableProps> = ({ ...props }) => (
  <Table
    label="Void Fragment Locations"
    headers={voidFragmentTableHeaders.map(key => (
      <th key={key} className="text-3xl">
        {key}
      </th>
    ))}
    body={deserializeZoneData().map(data => (
      <VoidFragmentRow key={data.subregion} data={data} />
    ))}
    {...props}
  />
);

export default VoidFragmentTable;
