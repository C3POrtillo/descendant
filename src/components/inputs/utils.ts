import type { RoundsType, TiersType } from '@/components/weapon/types';

import { weaponRounds } from '@/components/weapon/types';
import { roundsTypeToLabelClass, tierToLabelClass } from '@/components/weapon/utils';

export const defaultChecked = (defaultValue: number | string | 'all', value: string, index: number): boolean =>
  defaultValue === 'all' || defaultValue === index || defaultValue === value;

export const getLabelClass = (name: string, value: string): string => {
  if (name === 'weapon-tier') {
    return tierToLabelClass(value as TiersType);
  }
  if (name === 'rounds-type') {
    return roundsTypeToLabelClass(value as RoundsType);
  }
  if (name === 'weapon-type') {
    let rounds = undefined;

    for (const [key, weapons] of Object.entries(weaponRounds)) {
      const typeSafeArray: string[] = [...weapons];
      if (typeSafeArray.includes(value)) {
        rounds = key;
        break;
      }
    }

    return roundsTypeToLabelClass(rounds as RoundsType);
  }

  return '';
};
