import type { FilterOptionsData } from '@/components/inputs/types';

import { stringCompare } from '@/utils/utils';

export type BaseStat = {
  stat_id: string;
  stat_value: number;
};

export type FirearmAtk = {
  level: number;
  firearm: {
    firearm_atk_type: string;
    firearm_atk_value: number;
  }[];
};

export const statData = {
  '105000023': {
    label: 'Fire Rate\n(RPM)',
    format: (value: number) => value,
  },
  '105000021': {
    label: 'Rounds Per\nMagazine',
    format: (value: number) => value,
  },
  '105000095': {
    label: 'Reload\nTime',
    format: (value: number) => `${value.toFixed(2)}s`,
  },
  '105000030': {
    label: 'Critical\nChance',
    format: (value: number) => `${value}%`,
  },
  '105000031': {
    label: 'Critical\nDamage',
    format: (value: number) => `${value.toFixed(2)}x`,
  },
  '105000170': {
    label: 'Status\nChance',
    format: (value: number) => `${value.toFixed(2)}%`,
  },
  '105000035': {
    label: 'Weak Point\nDamage',
    format: (value: number) => `${value.toFixed(2)}x`,
  },
} as const;

export const weaponTableHeaders = [
  'Weapon',
  'Firearm\nATK',
  ...Object.values(statData).map(stat => stat.label),
  'DPS\n(Base)',
  'DPS\n(Crit)',
  'DPS\n(Crit + Weakpoint)',
] as const;

export const weaponRounds = {
  'General Rounds': ['Assault Rifle', 'Handgun', 'Machine Gun', 'Submachine Gun'],
  'High-Power Rounds': ['Launcher', 'Shotgun', 'Sniper Rifle'],
  'Impact Rounds': ['Hand Cannon', 'Scout Rifle'],
  'Special Rounds': ['Beam Rifle', 'Tactical Rifle'],
} as const;

export type RoundsType = keyof typeof weaponRounds;
export const roundsArray = Object.keys(weaponRounds) as RoundsType[];

export const tiers = ['Standard', 'Rare', 'Ultimate'] as const;
export type TiersType = (typeof tiers)[number];

export type WeaponType = (typeof weaponRounds)[keyof typeof weaponRounds][number];
export const weaponArray: WeaponType[] = Object.values(weaponRounds).flat();

export type FilterTypes = RoundsType | TiersType | WeaponType;
export const weaponFilterKeys = ['weapon_rounds_type', 'weapon_tier', 'weapon_type'] as const;
export type FilterMap = Record<FilterTypes, boolean>;

export const weaponOptions: FilterOptionsData[] = [
  {
    label: 'Tier',
    name: 'weapon-tier',
    data: [...tiers],
  },
  {
    label: 'Rounds',
    name: 'rounds-type',
    data: roundsArray,
  },
  {
    label: 'Type',
    name: 'weapon-type',
    data: weaponArray.sort(stringCompare),
  },
] as const;

export type WeaponData = {
  base_stat: BaseStat[];
  firearm_atk: FirearmAtk[];
  image_url: string;
  weapon_id: string;
  weapon_name: string;
  weapon_perk_ability_description: string;
  weapon_perk_ability_image_url: string;
  weapon_perk_ability_name: string;
  weapon_rounds_type: RoundsType;
  weapon_tier: TiersType;
  weapon_type: WeaponType;
};

export type StatData = {
  stat_id: string;
  stat_name: string;
};
