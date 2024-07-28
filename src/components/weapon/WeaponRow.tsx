import React from 'react';

import type { WeaponData } from '@/components/weapon/types';
import type { FC } from 'react';

import WeaponCard from '@/components/weapon/WeaponCard';
import { statData } from '@/components/weapon/types';
import { getDPS, getDPSCritical, getDPSCriticalWeakpoint } from '@/components/weapon/utils';

interface RowProps {
  data: WeaponData;
}

type StatId = keyof typeof statData;

const WeaponRow: FC<RowProps> = ({ data }) => {
  const firearmAtk = data.firearm_atk[99].firearm[0].firearm_atk_value;
  const filteredStats = data.base_stat
    .filter(({ stat_id }) => Object.keys(statData).includes(stat_id))
    .reduce((acc: Record<string, number>, { stat_id, stat_value }) => {
      acc[stat_id] = stat_value;

      return acc;
    }, {});

  const fireRate = filteredStats['105000023'];
  const magazineCapacity = filteredStats['105000021'];
  const reloadTime = filteredStats['105000095'];
  const criticalChance = filteredStats['105000030'];
  const criticalDamage = filteredStats['105000031'];
  const weakPointDamage = filteredStats['105000035'];

  const dps = getDPS({ firearmAtk, magazineCapacity, fireRate, reloadTime });
  const dpsCritical = getDPSCritical({ dps, criticalChance, criticalDamage });
  const dpsCriticalWeakpoint = getDPSCriticalWeakpoint({ dpsCritical, weakPointDamage });

  const tdClasses = 'text-center text-4xl pr-6';

  return (
    <tr>
      <td className="p-2">
        <WeaponCard {...data} />
      </td>
      <td className={tdClasses}>{Number(firearmAtk.toFixed(0)).toLocaleString('en', { useGrouping: true })}</td>
      {Object.keys(filteredStats).map(key => {
        const value = filteredStats[key];

        return (
          <td className={tdClasses} key={key}>
            {statData[key as StatId].format(value)}
          </td>
        );
      })}
      {[dps, dpsCritical, dpsCriticalWeakpoint].map(value => (
        <td className={[tdClasses, 'w-[210px]'].join(' ')} key={value}>
          {Number(value.toFixed(0)).toLocaleString('en', { useGrouping: true })}
        </td>
      ))}
    </tr>
  );
};

export default WeaponRow;
