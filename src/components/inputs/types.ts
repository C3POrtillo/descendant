import type { IconProps } from '@/components/icon/Icon';
import type { BlueprintTypes } from '@/components/patterns/types';
import type { VoidFragmentFilterTypes } from '@/components/void-fragments/types';
import type { WeaponFilterTypes } from '@/components/weapon/types';

export type DefaultCheckedType = number | string | 'all' | boolean;

export type LabelData = {
  value: string;
  label?: string;
  icon?: IconProps;
};

export type FilterOptionsData = {
  label: string;
  name: string;
  data: LabelData[];
  defaultChecked?: DefaultCheckedType;
};

export type FilterTypes = WeaponFilterTypes | VoidFragmentFilterTypes | BlueprintTypes;
export type FilterMap = Partial<Record<FilterTypes, boolean>>;

export type DirectionValues = 0 | 1 | 2;
