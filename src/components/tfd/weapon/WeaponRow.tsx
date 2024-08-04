import type { FormattedWeaponData } from '@/components/tfd/weapon/types';
import type { FC } from 'react';

import WeaponCard from '@/components/tfd/weapon/WeaponCard';
import { addSuffixToValue, delimitNumber, roundToHundreth } from '@/utils/utils';

const WeaponRow: FC<FormattedWeaponData> = ({
  firearmAtk,
  magazineSize,
  fireRate,
  criticalChance,
  criticalDamage,
  weakPointDamage,
  reloadTime,
  statusChance,
  baseDps,
  criticalDps,
  criticalWWeakPointDps,
  ...data
}) => {
  const tdClasses = 'text-center text-lg pr-7 md:text-lg lg:text-2xl 2xl:text-4xl';
  const formattedStats = [
    delimitNumber(firearmAtk),
    magazineSize,
    fireRate,
    addSuffixToValue(criticalChance, '%'),
    addSuffixToValue(roundToHundreth(criticalDamage), 'x'),
    addSuffixToValue(roundToHundreth(weakPointDamage), 'x'),
    addSuffixToValue(roundToHundreth(reloadTime), 's'),
    addSuffixToValue(roundToHundreth(statusChance), '%'),
  ];

  return (
    <tr>
      <td className="p-2">
        <WeaponCard {...data} />
      </td>
      {formattedStats.map((value, index) => (
        <td className={tdClasses} key={[data.weapon_id, index].join()}>
          {value}
        </td>
      ))}
      {[baseDps, criticalDps, criticalWWeakPointDps].map(value => (
        <td className={[tdClasses].filter(string => string).join(' ')} key={value}>
          {delimitNumber(value)}
        </td>
      ))}
    </tr>
  );
};

export default WeaponRow;
