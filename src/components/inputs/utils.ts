import type { DefaultCheckedType } from '@/components/inputs/types';

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
