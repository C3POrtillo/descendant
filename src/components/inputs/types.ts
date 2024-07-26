import type { VoidFragmentFilterTypes } from '@/components/void-fragments/types';
import type { WeaponFilterTypes } from '@/components/weapon/types';

export type DefaultCheckedType = number | string | 'all' | boolean;

export type FilterOptionsData = {
  label: string;
  name: string;
  data: string[];
  defaultChecked?: DefaultCheckedType;
};

export type FilterTypes = WeaponFilterTypes | VoidFragmentFilterTypes;
export type FilterMap = Partial<Record<FilterTypes, boolean>>;
