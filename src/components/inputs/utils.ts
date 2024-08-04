import type { DefaultCheckedType } from '@/components/inputs/types';

import { getRarity } from '@/components/patterns/utils';
import { createWeaponLabel } from '@/components/weapon/utils';

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

export const getLabelValue = (name: string, value: string): string => {
  switch (name) {
    case 'weapon-type':
      return createWeaponLabel(value);
    case 'enhance':
      return getRarity(value);
    default:
      return value;
  }
};
