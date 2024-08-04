import type { HardPattern, NormalPattern } from '@/components/patterns/types';
import type { FC } from 'react';

import { getBlueprintClass, isNormalPattern } from '@/components/patterns/utils';
import { getLabelClass } from '@/utils/utils';

interface RowProps {
  data: NormalPattern | HardPattern;
}

const PatternRow: FC<RowProps> = ({ data }) => {
  const { pattern, open, from, variant, vaulted } = data;
  const isNormal = isNormalPattern(data);
  const common = isNormal ? data['38%'] : data['32%'];
  const uncommon = isNormal ? data['15%'] : data['20%'];
  const rare = isNormal ? data['6%'] : data['10%'];
  const rarest = isNormal ? data['3%'] : data['6%'];
  const label = isNormal ? 'label-rare' : 'label-ultimate';
  const region = getLabelClass(from.split('\n')[0]);
  const dataArray = [pattern, from, open, rarest, rare, uncommon, common];

  return (
    <tr>
      {dataArray.map((value, index) => {
        const patternClass = index === 0 && label;
        const regionClass = 0 < index && index < 3 && region;
        const blueprintClass = 3 <= index && index < 6 && typeof value === 'string' && getBlueprintClass(value);
        const centerClass = index === 0 && 'justify-center text-center';
        const formattedValue =
          index === 0 && [value, variant, vaulted ? '(Vaulted)' : undefined].filter(text => text).join('\n');
        const commonDivs =
          typeof value !== 'string' &&
          value.map(commonDrop => (
            <div
              key={commonDrop}
              className={['flex w-1/2 items-center', getBlueprintClass(commonDrop)].filter(string => string).join(' ')}
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
