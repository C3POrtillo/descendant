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
  'High-Power Rounds': ['Launcher', 'Shotgun', 'Sniper'],
  'Impact Rounds': ['Hand Cannon', 'Scout Rifle'],
  'Special Rounds': ['Beam Rifle', 'Tactical Rifle'],
} as const;

export type RoundsType = keyof typeof weaponRounds;

export const weaponTiers = ['Standard', 'Rare', 'Ultimate'] as const;

export type TiersType = (typeof weaponTiers)[number];

export type WeaponType = (typeof weaponRounds)[keyof typeof weaponRounds][number];

export const weaponList: WeaponType[] = Object.values(weaponRounds).flat();

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
