import React from 'react';


import type { IconProps } from '@/components/icon/Icon';
import type { FilterTypes } from '@/components/void-fragments/types';
import type { AttributesType } from '@/utils/attributes/types';
import type { FC } from 'react';

import Icon from '@/components/icon/Icon';
import { getLabelClass } from '@/components/inputs/utils';
import { voidFragmentTableHeaders } from '@/components/void-fragments/types';
import { isOptimal } from '@/components/void-fragments/utils';
import { attributesImages } from '@/utils/attributes/types';

interface RowProps {
  data: Record<FilterTypes, string | number>;
}

const VoidFragmentRow: FC<RowProps> = ({ data }) => (
  <tr>
    {voidFragmentTableHeaders.map(key => {
      const lowerCaseKey = key.toLowerCase() as FilterTypes;
      const value = data[lowerCaseKey];
      const isSubregion = lowerCaseKey === 'subregion'

      const labelClass = getLabelClass(
        isSubregion ? (data['zone'] as string) : lowerCaseKey,
        value.toString(),
      );
      const numberClass = typeof value === 'number' && isOptimal(data['subregion'] as string);

      const icon: IconProps = {}
      const attributeIconData = attributesImages[data['attribute'] as AttributesType]
      switch (lowerCaseKey) {
        case 'subregion':
          icon['src'] = attributeIconData.fragment;
          icon['backgroundClass'] = 'diamond' 
          break;
        case 'attribute':
          icon['src'] = attributeIconData.attribute;
          icon['backgroundClass'] = 'hexagon' 
          break;
      }

      return value !== 0 ? (
        <td key={key} className={['p-4 text-center text-3xl', labelClass, numberClass].join(' ')}>
          <div className="flex flex-row items-center justify-center gap-2">
            {icon.src && <Icon {...icon}/>}
            {value}
          </div>
        </td>
      ) : (
        <td />
      );
    })}
  </tr>
);

export default VoidFragmentRow;
