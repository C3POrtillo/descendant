import type { TiersType } from '@/utils/types';

import { tiers } from '@/utils/types';

export const socketImages = {
  Almandine: '/assets/images/socket/almandine.png',
  Cerulean: '/assets/images/socket/cerulean.png',
  Malachite: '/assets/images/socket/malachite.png',
  Rutile: '/assets/images/socket/rutile.png',
  Xantic: '/assets/images/socket/xantic.png',
};

export type ModuleSocketTypes = keyof typeof socketImages;

export const moduleTiersArray = [...tiers, 'Transcendent'] as const;
export const moduleTypes = [
  'Special Mod',
  'Attribute ATK',
  'Attack',
  'Battle',
  'HP',
  'Shield',
  'Defense',
  'MP',
  'Control',
  'Resource',
] as const;
export const moduleClass = ['Descendant', ''] as const;
type ModuleTiersType = TiersType | 'Transcendent';
type ModuleTypes = (typeof moduleTypes)[number];
type ModuleClassTypes = (typeof moduleClass)[number];

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
