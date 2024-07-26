import type { DefaultCheckedType } from '@/components/inputs/types';

import { weaponRounds } from '@/components/weapon/types';
import { kebabCase } from '@/utils/utils';

export const setChecked = (defaultValue: DefaultCheckedType, value: string, index: number): boolean => {
  switch (typeof defaultValue) {
    case 'string':
      return defaultValue === 'all' || defaultValue === value;
    case 'number':
      return defaultValue === index;
    default:
      return defaultValue;
  }
};

export const createLabelClass = (tier: string): string => `label-${kebabCase(tier)}`;

const createWeaponLabel = (value: string) => {
  let rounds = '';

  for (const [key, weapons] of Object.entries(weaponRounds)) {
    const typeSafeArray: string[] = [...weapons];
    if (typeSafeArray.includes(value)) {
      rounds = key;
      break;
    }
  }

  return createLabelClass(rounds);
};

export const getLabelClass = (name: string, value: string): string => {
  switch (name) {
    case 'weapon-tier':
    case 'rounds-type':
    case 'attribute':
    case 'zone':
      return createLabelClass(value);
    case 'weapon-type':
      return createWeaponLabel(value);
    default:
      return createLabelClass(name);
  }
};
