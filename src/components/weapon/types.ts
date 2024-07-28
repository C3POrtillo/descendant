import type { FilterOptionsData } from '@/components/inputs/types';

import { kebabCase, stringCompare } from '@/utils/utils';

type BaseStat = {
  stat_id: string;
  stat_value: number;
};

type FirearmAtk = {
  level: number;
  firearm: {
    firearm_atk_type: string;
    firearm_atk_value: number;
  }[];
};

export const statData = {
  '105000023': {
    label: 'Fire Rate',
    format: (value: number) => value,
  },
  '105000021': {
    label: 'Magazine\nSize',
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
    label: 'Weak Point\nDmg',
    format: (value: number) => `${value.toFixed(2)}x`,
  },
} as const;

export const weaponTableHeaders = [
  'Weapon\n(Lvl. 100)',
  'Firearm\nATK',
  ...Object.values(statData).map(stat => stat.label),
  'Base DPS',
  'Critical DPS',
  'Critical w/\nWeak Point DPS',
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

export type WeaponFilterTypes = RoundsType | TiersType | WeaponType;
export const weaponFilterKeys = ['weapon_rounds_type', 'weapon_tier', 'weapon_type'] as const;
export type WeaponFilterMap = Partial<Record<WeaponFilterTypes, boolean | undefined>>;

export const roundsImages = roundsArray.reduce( (acc, rounds) => {
  acc[rounds] = `/assets/images/rounds/${kebabCase(rounds)}.png`

  return acc
}, {} as Record<RoundsType, string>)

const weaponToRounds = (weapon: WeaponType): RoundsType => {
  for (const [rounds, weapons] of Object.entries(weaponRounds)) {
    if ((weapons as unknown as WeaponType[]).includes(weapon)) {
      return rounds as RoundsType
    }
  }

  return 'General Rounds'
}

export const weaponOptions: FilterOptionsData[] = [
  {
    label: 'Tier',
    name: 'weapon-tier',
    data: tiers.map(tier => ({
      value: tier,
    })),
  },
  {
    label: 'Rounds',
    name: 'rounds-type',
    data: roundsArray.map(rounds => ({
      value: rounds,
      icon: {
        src: roundsImages[rounds],
      }
    })),
  },
  {
    label: 'Type',
    name: 'weapon-type',
    data: weaponArray.sort(stringCompare).map(weapon => ({
      value: weapon,
      icon: {
        src: roundsImages[weaponToRounds(weapon)],
      }
    })),
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
