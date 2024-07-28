import React from 'react';

import type { FormattedWeaponData } from '@/components/weapon/types';
import type { FC } from 'react';

import WeaponCard from '@/components/weapon/WeaponCard';
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
  const tdClasses = 'text-center text-4xl pr-6';
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
        <td className={[tdClasses, 'w-[210px]'].join(' ')} key={value}>
          {delimitNumber(value)}
        </td>
      ))}
    </tr>
  );
};

export default WeaponRow;
