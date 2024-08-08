import type { TiersType } from '@/utils/types';

export const socketImages = {
  Almandine: '/assets/images/module/almandine.png',
  Cerulean: '/assets/images/module/cerulean.png',
  Malachite: '/assets/images/module/malachite.png',
  Rutile: '/assets/images/module/rutile.png',
  Xantic: '/assets/images/module/xantic.png',
};

export const classImages = {
  Descendant: '/assets/images/descendant.png',
  'General Rounds': '/assets/images/rounds/general-rounds.png',
  'High-Power Rounds': '/assets/images/rounds/high-power-rounds.png',
  'Impact Rounds': '/assets/images/rounds/impact-rounds.png',
  'Special Rounds': '/assets/images/rounds/special-rounds.png',
};

export type ModuleSocketTypes = keyof typeof socketImages;

export const kuiperCosts = {
  Standard: [300, 600, 1100, 2000, 3400, 5700, 9500, 15500, 25000, 40000],
  Rare: [600, 1200, 2200, 4000, 6800, 11400, 19000, 31000, 50000, 80000],
  Ultimate: [900, 1800, 3300, 6000, 10200, 17100, 28500, 46500, 75000, 120000],
  Transcendent: [1500, 3000, 5500, 10000, 17000, 28500, 47500, 77500, 125000, 200000],
} as const;

export const costTypes = ['Kuiper', 'Gold'];
export const costSublabels = ['Cost', 'Total'];

export const moduleTypes = [
  null,
  'ATK',
  'Accuracy',
  'Arche Tech',
  'Attack',
  'Attribute ATK',
  'Battle',
  'Bullet Improvement',
  'Control',
  'Cooldown',
  'Defense',
  'Final Hand',
  'Fire Rate',
  'Firearm Critical Hit Damage',
  'Firearm Critical Hit Rate',
  'Fortitude',
  'Guard',
  'HP',
  'Luck',
  'MP',
  'Medical',
  'Range',
  'Recoil',
  'Reload Time Modifier',
  'Resource',
  'Rounds Conversion',
  'Rounds per Magazine',
  'Shield',
  'Special Mod',
  'Strike',
  'Support Tech',
  'Weak Point Strike',
] as const;
export type ModuleTiersType = TiersType | 'Transcendent';
type ModuleTypes = (typeof moduleTypes)[number];
type ModuleClassTypes = keyof typeof classImages;

type ModuleStat = {
  level: number;
  module_capacity: number;
  value: string;
};

export type ModuleAPIData = {
  module_name: string;
  module_id: string;
  image_url: string;
  module_type: ModuleTypes;
  module_tier: ModuleTiersType;
  module_socket_type: ModuleSocketTypes;
  module_class: ModuleClassTypes;
  module_stat: ModuleStat[];
};
