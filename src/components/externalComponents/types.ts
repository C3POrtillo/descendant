import type { FilterOptionsData } from '@/components/inputs/types';
import type { BaseStat, TiersType } from '@/utils/types';

import { tiers } from '@/utils/types';

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
export type ExternalComponentTypes = keyof T['substats'];
type MainStatTypes = T['stat'][number];

type SetOptionData = {
  set_option: string;
  set_count: number;
  set_option_effect: string;
};

type BaseData = {
  external_component_id: string;
  external_component_name: string;
  image_url: string;
  external_component_equipment_type: ExternalComponentTypes;
  external_component_tier: TiersType;
  set_option_detail?: SetOptionData[];
};

type ExternalComponentBaseStat = BaseStat &
  {
    level: number;
  }[];

export const mainStatMap = {
  '105000001': 'HP',
  '105000029': 'DEF',
  '105000025': 'Shield',
} as const;

export const mainStats = Object.values(mainStatMap) as MainStatTypes[];

export type MainStatMapKeys = keyof typeof mainStatMap;

export type ExternalComponentData = BaseData & {
  base_stat: ExternalComponentBaseStat[];
};

export type ExternalComponentStatType = {
  stat_id: MainStatTypes;
  stat_value: number;
};

export type FormattedExternalComponentData = BaseData & {
  stat: ExternalComponentStatType;
};

export type BasicDataType = {
  image_url: string;
  Standard?: ExternalComponentStatType[];
  Rare?: ExternalComponentStatType[];
  Ultimate?: ExternalComponentStatType[];
};

export type FormattedBasicData = Record<ExternalComponentTypes, BasicDataType>;

export const externalComponentsArray = Object.keys(externalComponentStats.substats) as ExternalComponentTypes[];

export const filterOptions: FilterOptionsData[] = [
  {
    label: 'Tier',
    name: 'external_component_tier',
    data: tiers.slice(1).map(tier => ({
      value: tier,
    })),
  },
  {
    label: 'Component',
    name: 'external_component_equipment_type',
    data: externalComponentsArray.map(component => ({
      value: component,
    })),
  },
];

type ExternalComponentsFilterTypes = ExternalComponentTypes | TiersType;
export type ExternalComponentsFilterMap = Partial<Record<ExternalComponentsFilterTypes, boolean | undefined>>;
