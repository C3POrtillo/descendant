import type { Pattern } from '@/components/tfd/patterns/types';
import type { FC } from 'react';

import { getBlueprintClass, getBlueprints } from '@/components/tfd/patterns/utils';
import { getLabelClass } from '@/utils/utils';

interface RowProps {
  data: Pattern;
}

const PatternRow: FC<RowProps> = ({ data }) => {
  const { pattern, open, from, variant, vaulted, stealth } = data;
  const blueprints = getBlueprints(data);
  const label = data['38%'] ? 'label-rare' : 'label-ultimate';
  const region = getLabelClass(from.split('\n')[0]);
  const dataArray = [pattern, from, open, ...blueprints];

  return (
    <tr>
      {dataArray.map((value, index) => {
        const patternClass = index === 0 && label;
        const regionClass = 0 < index && index < 3 && region;
        const blueprintClass =
          3 <= index && index < 6 && typeof value === 'string' && getLabelClass(getBlueprintClass(value));
        const centerClass = index === 0 && 'justify-center text-center';
        const formattedValue =
          index === 0 &&
          [`${value}${stealth ? '*' : ''}`, variant, vaulted && '(Vaulted)'].filter(text => text).join('\n');
        const commonDivs =
          typeof value !== 'string' &&
          value?.map(commonDrop => (
            <div
              key={commonDrop}
              className={['flex w-1/2 items-center', getLabelClass(getBlueprintClass(commonDrop))].join(' ')}
            >
              {commonDrop}
            </div>
          ));

        return (
          <td
            key={[pattern, index].join('-')}
            className={['p-4 text-lg 2xl:text-xl', patternClass, regionClass, blueprintClass]
              .filter(string => string)
              .join(' ')}
          >
            {
              <div
                className={['flex flex-row gap-4 whitespace-pre-wrap', centerClass].filter(string => string).join(' ')}
              >
                {commonDivs || formattedValue || value}
              </div>
            }
          </td>
        );
      })}
    </tr>
  );
};

export default PatternRow;
