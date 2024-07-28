import type { BaseStat, TiersType } from '@/utils/types';

export const externalComponentStats = {
  stat: ['HP', 'DEF', 'Shield'],
  substats: {
    'Auxiliary Power': ['Max HP', 'Fire Resistance', 'Module Drop Rate', 'Kuiper Drop Rate', 'DBNO Duration'],
    Sensor: [
      'Max MP',
      'Chill Resistance',
      'Consumable Drop Rate',
      'Character EXP Gain Modifier',
      'Shield Recovery out of Combat',
      'MP Recovery in Combat',
      'HP Recovery Modifier',
    ],
    Memory: [
      'DEF',
      'Electric Resistance',
      'Gold Drop Rate',
      'Firearm Proficiency Gain Modifier',
      'Shield Recovery in Combat',
      'MP Recovery Modifier',
      'Ecive Search Radius',
    ],
    Processor: [
      'Max Shield',
      'Toxin Resistance',
      'Equipment Drop Rate',
      'Shield Recovery Modifier',
      'Item Acquisition DIstance',
      'Ecive Display Time',
    ],
  },
} as const;

type T = typeof externalComponentStats;
type ExternalComponentTypes = keyof T['substats'];
type MainStatTypes = T['stat'][number];

type BaseData = {
  external_component_id: string;
  external_component_name: string;
  image_url: string;
  external_component_equipment_type: ExternalComponentTypes;
  external_component_tier: TiersType;
};

type ExternalComponentBaseStat = BaseStat &
  {
    level: number;
  }[];

type SetOptionData = {
  set_option: string;
  set_count: number;
  set_option_effect: string;
};

export const mainStatMap = {
  '105000001': 'HP',
  '105000029': 'DEF',
  '105000025': 'Shield',
} as const;

export type MainStatMapKeys = keyof typeof mainStatMap;

export type ExternalComponentData = BaseData & {
  base_stat: ExternalComponentBaseStat[];
  set_option_detail?: SetOptionData[];
};

export type ExternalComponentStatType = {
  stat_id: MainStatTypes;
  stat_value: number;
};

export type FormattedExternalComponentData = BaseData & {
  stat: ExternalComponentStatType;
};
