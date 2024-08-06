export const reactorStats = {
  ultimate: {
    skillPower: 11060.96,
    subAttackPower: 20557,
    skillBoost: '160%',
  },
  rare: {
    skillPower: 11060.96,
    subAttackPower: 20557,
    skillBoost: '140%',
  },
  subStats: [
    'Skill Effect Range',
    'Skill Duration Down',
    'Skill Cooldown',
    'Skill Cost',
    'Skill Critical Hit Rate',
    'Skill Critical Hit Damage',
    'Chill Skill Power Boost Ratio',
    'Electric Skill Power Boost Ratio',
    'Fire Skill Power Boost Ratio',
    'Non-Attribute Skill Power Boost Ratio',
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

export const reactorArcheTypes = [
  {
    name: 'Singularity',
    type: 'Singular',
    icon: '/assets/images/archeType/singular.png',
  },
  {
    name: 'Phase',
    type: 'Dimension',
    icon: '/assets/images/archeType/dimension.png',
  },
  {
    name: 'Mixture',
    type: 'Fusion',
    icon: '/assets/images/archeType/fusion.png',
  },
  {
    name: 'Mechanics',
    type: 'Tech',
    icon: '/assets/images/archeType/tech.png',
  },
] as const;

export const reactorAttributeTypes = [
  {
    name: 'Materialized',
    type: 'Non-attribute',
    icon: '/assets/images/attribute/non-attribute.png',
  },
  {
    name: 'Frozen',
    type: 'Chill',
    icon: '/assets/images/attribute/chill.png',
  },
  {
    name: 'Burning',
    type: 'Fire',
    icon: '/assets/images/attribute/fire.png',
  },
  {
    name: 'Tingling',
    type: 'Electric',
    icon: '/assets/images/attribute/electric.png',
  },
  {
    name: 'Toxic',
    type: 'Toxic',
    icon: '/assets/images/attribute/.png',
  },
] as const;

export const unusedCombinations = [
  'Frozen Singularity',
  'Frozen Phase',
  'Tingling Mechanics',
  'Toxic Singularity',
  'Toxic Mixture',
];
