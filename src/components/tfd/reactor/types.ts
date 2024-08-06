import type { TiersType } from '@/utils/types';

export const reactorStats = {
  ultimate: '160%',
  rare: '140%',
  subStats: [
    'Skill Effect Range',
    'Skill Duration Down',
    'Skill Cooldown',
    'Skill Cost',
    'Skill Critical Hit Rate',
    'Skill Critical Hit Damage',
    'Non-Attribute Skill Power Boost Ratio',
    'Fire Skill Power Boost Ratio',
    'Chill Skill Power Boost Ratio',
    'Electric Skill Power Boost Ratio',
    'Toxic Skill Power Boost Ratio',
    'Dimension Skill Power Boost Ratio',
    'Fusion Skill Power Boost Ratio',
    'Singular Skill Power Boost Ratio',
    'Tech Skill Power Boost Ratio',
    'Sub Attack Power Modifier',
    'Hp Heal Modifier',
    'Additional Skill ATK When Attacking Colossus',
    'Additional Skill ATK When Attacking Legion of Immortaility',
    'Additional Skill ATK When Attacking Legion of Darkness',
    'Additional Skill ATK When Attacking Order of Truth',
  ],
} as const;

type ReactorSkillPowerType = {
  level: number;
  skill_atk_power: number;
  sub_skill_atk_power: number;
};

export type ReactorAPIData = {
  reactor_name: string;
  image_url: string;
  reactor_tier: TiersType;
  reactor_skill_power: ReactorSkillPowerType[];
};

export type FormattedReactorData = ReactorSkillPowerType & {
  reactor_name: string;
  image_url: string;
};

export const reactorArches = {
  Singularity: {
    type: 'Singular',
    icon: '/assets/images/archeType/singular.png',
  },
  Phase: {
    type: 'Dimension',
    icon: '/assets/images/archeType/dimension.png',
  },
  Mixture: {
    type: 'Fusion',
    icon: '/assets/images/archeType/fusion.png',
  },
  Mechanics: {
    type: 'Tech',
    icon: '/assets/images/archeType/tech.png',
  },
} as const;

export const reactorAttributes = {
  Materialized: {
    type: 'Non-attribute',
    icon: '/assets/images/attribute/non-attribute.png',
  },
  Frozen: {
    type: 'Chill',
    icon: '/assets/images/attribute/chill.png',
  },
  Burning: {
    type: 'Fire',
    icon: '/assets/images/attribute/fire.png',
  },
  Tingling: {
    type: 'Electric',
    icon: '/assets/images/attribute/electric.png',
  },
  Toxic: {
    type: 'Toxic',
    icon: '/assets/images/attribute/toxic.png',
  },
} as const;

export type ReactorArchesType = keyof typeof reactorArches;
export type ReactorAttributesType = keyof typeof reactorAttributes;

export const unusedCombinations = [
  'Frozen\nSingularity',
  'Frozen\nPhase',
  'Tingling\nMechanics',
  'Toxic\nSingularity',
  'Toxic\nMixture',
];
