import type { FormattedWeaponData, WeaponData } from '@/components/weapon/types';

import { statData } from '@/components/weapon/types';

type DPSProps = Record<string, number>;

const getDPS = ({ firearmAtk, magazineCapacity, fireRate, reloadTime }: DPSProps) =>
  (firearmAtk * magazineCapacity) / (magazineCapacity / (fireRate / 60) + reloadTime);

const getDPSCritical = ({ dps, criticalChance, criticalDamage }: DPSProps) =>
  dps * (1 + (criticalChance / 100) * (criticalDamage - 1));

const getDPSCriticalWeakpoint = ({ dpsCritical, weakPointDamage }: DPSProps) => dpsCritical * (weakPointDamage + 0.5);

export const reformatWeaponData = (weaponData: WeaponData[]): FormattedWeaponData[] =>
  weaponData.map(
    ({ image_url, weapon_id, weapon_name, weapon_rounds_type, weapon_tier, weapon_type, firearm_atk, base_stat }) => {
      const firearmAtk = firearm_atk[99].firearm[0].firearm_atk_value;
      const filteredStats = base_stat
        .filter(({ stat_id }) => Object.keys(statData).includes(stat_id))
        .reduce((acc: Record<string, number>, { stat_id, stat_value }) => {
          acc[stat_id] = stat_value;

          return acc;
        }, {});

      const fireRate = filteredStats['105000023'];
      const magazineSize = filteredStats['105000021'];
      const reloadTime = filteredStats['105000095'];
      const criticalChance = filteredStats['105000030'];
      const criticalDamage = filteredStats['105000031'];
      const weakPointDamage = filteredStats['105000035'];

      const baseDps = getDPS({ firearmAtk, magazineCapacity: magazineSize, fireRate, reloadTime });
      const criticalDps = getDPSCritical({ dps: baseDps, criticalChance, criticalDamage });
      const criticalWWeakPointDps = getDPSCriticalWeakpoint({ dpsCritical: criticalDps, weakPointDamage });

      return {
        image_url,
        weapon_id,
        weapon_name,
        weapon_rounds_type,
        weapon_tier,
        weapon_type,
        firearmAtk,
        magazineSize,
        fireRate,
        criticalChance,
        criticalDamage,
        weakPointDamage,
        reloadTime,
        statusChance: filteredStats['105000170'],
        baseDps,
        criticalDps,
        criticalWWeakPointDps,
      };
    },
  );
