import type { FC } from 'react';

import { type ModuleTiersType, costSublabels, costTypes } from '@/components/tfd/module/types';
import { getLabelClass } from '@/utils/utils';

interface ModuleCostsProps {
  label: ModuleTiersType;
  kuiperPerLevel: readonly number[];
}

const ModuleCosts: FC<ModuleCostsProps> = ({ label, kuiperPerLevel }) => {
  const labelClass = getLabelClass(label);
  const gridClasses = 'grid grid-cols-9';
  const levelClasses = 'pr-2 text-right';

  const rows = kuiperPerLevel.map((currentKuiper, index) => {
    const currentGold = currentKuiper * 10;
    const previousKuiper = index === 0 ? 0 : kuiperPerLevel[index - 1];
    const totalKuiper = previousKuiper + currentKuiper;
    const totalGold = totalKuiper * 10;
    const values = [index + 1, currentKuiper, totalKuiper, currentGold, totalGold];

    return (
      <div key={currentKuiper} className={['odd:bg-slate-800 even:bg-slate-700', gridClasses].join(' ')}>
        {values.map((value, valueIndex) => {
          const spanClass = valueIndex !== 0 ? 'col-span-2' : levelClasses;
          const borderClass = valueIndex % 2 === 1 ? 'border-l-1 border-black px-2' : undefined;

          return (
            <span key={value} className={[spanClass, borderClass].filter(string => string).join(' ')}>
              {value.toLocaleString('en', { useGrouping: true })}
            </span>
          );
        })}
      </div>
    );
  });

  const headers = costTypes.map((cost, index) => {
    const labelColor = index === 0 ? 'text-sky-400' : 'text-yellow-600';

    return (
      <div key={cost} className="col-span-4 flex flex-col border-l-1 border-black">
        <span className={['pl-2', labelColor].join(' ')}>{cost}</span>
        <div className="grid grid-cols-2">
          {costSublabels.map((sublabel, sublabelIndex) => (
            <span key={sublabel} className={sublabelIndex === 0 ? 'px-2' : undefined}>
              {sublabel}
            </span>
          ))}
        </div>
      </div>
    );
  });

  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="flex flex-col overflow-clip rounded-lg border-2 border-black bg-slate-900 shadow-lg shadow-black">
      <h3 className={['py-2 text-center text-lg xl:text-xl', labelClass].join(' ')}>{label}</h3>
      <div className={['border-y-1 border-black', gridClasses].join(' ')}>
        <span className={['self-end', levelClasses].join(' ')}>{'Lvl.'}</span>
        {headers}
      </div>
      {rows}
    </div>
  );
};

export default ModuleCosts;
