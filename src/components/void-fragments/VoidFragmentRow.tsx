import React from 'react';

import type { FC } from 'react';

import { getLabelClass } from '@/components/inputs/utils';
import { voidFragmentTableHeaders } from '@/components/void-fragments/types';

interface RowProps {
  data: Record<string, string | number>;
}

const VoidFragmentRow: FC<RowProps> = ({ data }) => (
  <tr>
    {voidFragmentTableHeaders.map(key => {
      const lowerCaseKey = key.toLowerCase();
      const value = data[lowerCaseKey];
      const className = `p-4 text-center text-2xl ${getLabelClass(
        lowerCaseKey === 'subregion' ? (data['zone'] as string) : lowerCaseKey,
        value.toString(),
      )}`;

      return value !== 0 ? (
        <td key={key} className={className}>
          {value}
        </td>
      ) : (
        <td />
      );
    })}
  </tr>
);

export default VoidFragmentRow;
