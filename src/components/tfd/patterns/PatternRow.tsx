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
        const noWrap = index < 3 && 'text-nowrap';
        const formattedValue =
          index === 0 &&
          [`${value}${stealth ? '*' : ''}`, variant, vaulted && '(Vaulted)'].filter(text => text).join('\n');
        const commonDivs =
          typeof value !== 'string' &&
          value?.map((commonDrop, dropIndex) => (
            <div
              key={commonDrop}
              className={[
                'flex items-center',
                getLabelClass(getBlueprintClass(commonDrop)),
                dropIndex === 0 && 'mb-1 border-b-1 border-white pb-1',
              ].join(' ')}
            >
              {commonDrop}
            </div>
          ));

        return (
          <td
            key={[pattern, index].join('-')}
            className={['p-2 text-lg 2xl:text-xl', patternClass, regionClass, blueprintClass]
              .filter(string => string)
              .join(' ')}
          >
            {
              <div
                className={['flex flex-col whitespace-pre-wrap', centerClass, noWrap]
                  .filter(string => string)
                  .join(' ')}
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
