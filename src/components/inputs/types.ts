import type { IconProps } from '@/components/icon/Icon';
import type { VoidFragmentFilterTypes } from '@/components/void-fragments/types';
import type { WeaponFilterTypes } from '@/components/weapon/types';

export type DefaultCheckedType = number | string | 'all' | boolean;

export type LabelData = {
  value: string;
  icon?: IconProps;
};

export type FilterOptionsData = {
  label: string;
  name: string;
  data: LabelData[];
  defaultChecked?: DefaultCheckedType;
};

export type FilterTypes = WeaponFilterTypes | VoidFragmentFilterTypes;
export type FilterMap = Partial<Record<FilterTypes, boolean>>;
