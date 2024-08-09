import type { FilterOptionsData } from '@/components/inputs/types';
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

type ModuleSocketTypes = keyof typeof socketImages;

export const kuiperCosts = {
  Standard: [300, 600, 1100, 2000, 3400, 5700, 9500, 15500, 25000, 40000],
  Rare: [600, 1200, 2200, 4000, 6800, 11400, 19000, 31000, 50000, 80000],
  Ultimate: [900, 1800, 3300, 6000, 10200, 17100, 28500, 46500, 75000, 120000],
  Transcendent: [1500, 3000, 5500, 10000, 17000, 28500, 47500, 77500, 125000, 200000],
} as const;

export const costTypes = ['Kuiper', 'Gold'];
export const costSublabels = ['Cost', 'Total'];

export const moduleTypes = [
  'None',
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
export const moduleTiers = Object.keys(kuiperCosts) as ModuleTiersType[];
export const moduleSockets = Object.keys(socketImages) as ModuleSocketTypes[];
export const moduleClasses = Object.keys(classImages) as ModuleClassTypes[];
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

export type Probability = Partial<Record<ModuleTiersType, number>>;

export const decodeChar = {
  s: 'Standard',
  r: 'Rare',
  u: 'Ultimate',
  t: 'Transcendent',
} as const;

export const probabilities = {
  ssss: {
    Standard: 90,
    Rare: 10,
  },
  sssr: {
    Standard: 67.5,
    Rare: 30,
    Ultimate: 2.5,
  },
  sssu: {
    Standard: 67.5,
    Rare: 7.5,
    Ultimate: 22.5,
    Transcendent: 2.5,
  },
  ssst: {
    Standard: 67.5,
    Rare: 7.5,
    Transcendent: 25,
  },
  ssru: {
    Standard: 45,
    Rare: 27.5,
    Ultimate: 25,
    Transcendent: 2.5,
  },
  ssrt: {
    Standard: 45,
    Rare: 27.5,
    Ultimate: 2.5,
    Transcendent: 25,
  },
  ssut: {
    Standard: 45,
    Rare: 5,
    Ultimate: 22.5,
    Transcendent: 27.5,
  },
  ssrr: {
    Standard: 45,
    Rare: 50,
    Ultimate: 5,
  },
  ssuu: {
    Standard: 45,
    Rare: 5,
    Ultimate: 45,
    Transcendent: 5,
  },
  sstt: {
    Standard: 45,
    Rare: 5,
    Transcendent: 50,
  },
  srut: {
    Standard: 22.5,
    Rare: 25,
    Ultimate: 25,
    Transcendent: 27.5,
  },
  srru: {
    Standard: 22.5,
    Rare: 47.5,
    Ultimate: 27.5,
    Transcendent: 2.5,
  },
  sruu: {
    Standard: 22.5,
    Rare: 25,
    Ultimate: 47.5,
    Transcendent: 5,
  },
  srrt: {
    Standard: 22.5,
    Rare: 47.5,
    Ultimate: 5,
    Transcendent: 25,
  },
  srtt: {
    Standard: 22.5,
    Rare: 25,
    Ultimate: 2.5,
    Transcendent: 50,
  },
  suut: {
    Standard: 22.5,
    Rare: 2.5,
    Ultimate: 45,
    Transcendent: 30,
  },
  sutt: {
    Standard: 22.5,
    Rare: 2.5,
    Ultimate: 22.5,
    Transcendent: 52.5,
  },
  srrr: {
    Standard: 22.5,
    Rare: 70,
    Ultimate: 7.5,
  },
  suuu: {
    Standard: 22.5,
    Rare: 2.5,
    Ultimate: 67.5,
    Transcendent: 7.5,
  },
  sttt: {
    Standard: 22.5,
    Rare: 2.5,
    Transcendent: 75,
  },
  rrrr: {
    Rare: 90,
    Ultimate: 10,
  },
  rrru: {
    Rare: 67.5,
    Ultimate: 30,
    Transcendent: 2.5,
  },
  rrrt: {
    Rare: 67.5,
    Ultimate: 7.5,
    Transcendent: 25,
  },
  rrut: {
    Rare: 45,
    Ultimate: 27.5,
    Transcendent: 27.5,
  },
  rruu: {
    Rare: 45,
    Ultimate: 50,
    Transcendent: 5,
  },
  rrtt: {
    Rare: 45,
    Ultimate: 5,
    Transcendent: 50,
  },
  ruuu: {
    Rare: 22.5,
    Ultimate: 70,
    Transcendent: 7.5,
  },
  rttt: {
    Rare: 22.5,
    Ultimate: 2.5,
    Transcendent: 75,
  },
  rutt: {
    Rare: 22.5,
    Ultimate: 25,
    Transcendent: 52.5,
  },
  ruut: {
    Rare: 22.5,
    Ultimate: 47.5,
    Transcendent: 30,
  },
  uuuu: {
    Ultimate: 90,
    Transcendent: 10,
  },
  uuut: {
    Ultimate: 67.5,
    Transcendent: 32.5,
  },
  uutt: {
    Ultimate: 45,
    Transcendent: 55,
  },
  uttt: {
    Ultimate: 22.5,
    Transcendent: 77.5,
  },
  tttt: {
    Transcendent: 100,
  },
} as Record<string, Probability>;

export type ModuleFilterMap = Partial<
  Record<ModuleSocketTypes | ModuleClassTypes | ModuleTiersType | ModuleTypes, boolean | undefined>
>;

export const moduleOptions: FilterOptionsData[] = [
  {
    label: 'Tier',
    name: 'tier',
    data: moduleTiers.map(value => ({ value })),
  },
  {
    label: 'Class',
    name: 'class',
    data: Object.entries(classImages).map(([value, src]) => ({
      value,
      icon: {
        src,
        backgroundClass: 'diamond',
      },
    })),
  },
  {
    label: 'Socket',
    name: 'socket',
    data: Object.entries(socketImages).map(([value, src]) => ({
      value,
      icon: {
        src,
        backgroundClass: 'rounded-square',
      },
    })),
  },
];

export const typeOptions: FilterOptionsData = {
  label: 'Type',
  name: 'module-type',
  data: moduleTypes.map(value => ({ value })),
};
