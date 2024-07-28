export const externalComponentStats = {
  stat: ['HP', 'DEF', 'Shield'],
  substats: {
    auxiliaryPower: ['Max HP', 'Fire Resistance', 'Module Drop Rate', 'Kuiper Drop Rate', 'DBNO Duration'],
    sensor: [
      'Max MP',
      'Chill Resistance',
      'Consumable Drop Rate',
      'Character EXP Gain Modifier',
      'Shield Recovery out of Combat',
      'MP Recovery in Combat',
      'HP Recovery Modifier',
    ],
    memory: [
      'DEF',
      'Electric Resistance',
      'Gold Drop Rate',
      'Firearm Proficiency Gain Modifier',
      'Shield Recovery in Combat',
      'MP Recovery Modifier',
      'Ecive Search Radius',
    ],
    processor: [
      'Max Shield',
      'Toxin Resistance',
      'Equipment Drop Rate',
      'Shield Recovery Modifier',
      'Item Acquisition DIstance',
      'Ecive Display Time'
    ]
  },
} as const;

type T = typeof externalComponentStats
type MainStats = T['stat'][number];
type ExternalComponentTypes = keyof T['substats'];
type AuxiliaryPowerSubStats = T['substats']['auxiliaryPower'][number];
type SensorSubStats = T['substats']['sensor'][number];
type MemorySubStats= T['substats']['memory'][number];
type ProcessorSubStats = T['substats']['processor'][number];
