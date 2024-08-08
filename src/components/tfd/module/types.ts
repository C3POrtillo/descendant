import type { TiersType } from '@/utils/types';

import { tiers } from '@/utils/types';

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

export const moduleTiersArray = [...tiers, 'Transcendent'] as const;
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
