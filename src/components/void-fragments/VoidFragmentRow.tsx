import React from 'react';

import type { FilterTypes } from '@/components/void-fragments/types';
import type { FC } from 'react';

import { getLabelClass } from '@/components/inputs/utils';
import { voidFragmentTableHeaders } from '@/components/void-fragments/types';
import { isOptimal } from '@/components/void-fragments/utils';

interface RowProps {
  data: Record<FilterTypes, string | number>;
}

const VoidFragmentRow: FC<RowProps> = ({ data }) => (
  <tr>
    {voidFragmentTableHeaders.map(key => {
      const lowerCaseKey = key.toLowerCase() as FilterTypes;
      const value = data[lowerCaseKey];
      const labelClass = getLabelClass(
        lowerCaseKey === 'subregion' ? (data['zone'] as string) : lowerCaseKey,
        value.toString(),
      );
      const numberClass = typeof value === 'number' && isOptimal(data['subregion'] as string);

      return value !== 0 ? (
        <td key={key} className={['p-4 text-center text-3xl', labelClass, numberClass].join(' ')}>
          {value}
        </td>
      ) : (
        <td />
      );
    })}
  </tr>
);

export default VoidFragmentRow;
