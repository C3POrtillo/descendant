import React from 'react';

import type { TableProps } from '@/components/table/Table';
import type { VoidFragmentData } from '@/components/void-fragments/types';
import type { FC } from 'react';

import Table from '@/components/table/Table';
import VoidFragmentRow from '@/components/void-fragments/VoidFragmentRow';
import { voidFragmentTableHeaders } from '@/components/void-fragments/types';

interface VoidFragmentTableProps extends TableProps {
  fragmentData: VoidFragmentData[];
}

const VoidFragmentTable: FC<VoidFragmentTableProps> = ({ fragmentData, ...props }) => (
  <Table
    label="Void Fragment Locations"
    headers={voidFragmentTableHeaders.map(key => (
      <th key={key} className="text-4xl">
        {key}
      </th>
    ))}
    body={fragmentData.map(data => (
      <VoidFragmentRow key={data.subregion} data={data} />
    ))}
    {...props}
  />
);

export default VoidFragmentTable;
