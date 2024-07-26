import type { FilterOptionsData } from '@/components/inputs/types';

export const voidFragmentData = {
  Kingston: {
    id: 0,
    subregions: [
      {
        subregion: 'Grand Square',
        attribute: 'Non-attribute',
        monomer: 3,
        polymer: 3,
        organic: 3,
        inorganic: 3,
      },
    ],
  },
  'Sterile Land': {
    id: 1,
    subregions: [
      {
        subregion: 'Iron Works',
        attribute: 'Chill',
        monomer: 3,
        polymer: 3,
        organic: 3,
        inorganic: 3,
      },
      {
        subregion: 'Restricted Zone',
        attribute: 'Fire',
        monomer: 3,
        polymer: 3,
        organic: 3,
        inorganic: 3,
      },
      {
        subregion: 'Repository',
        attribute: 'Electric',
        monomer: 19,
        polymer: 0,
        organic: 0,
        inorganic: 4,
      },
      {
        subregion: 'Rockfall',
        attribute: 'Electric',
        monomer: 19,
        polymer: 4,
        organic: 0,
        inorganic: 0,
      },
    ],
  },
  Vespers: {
    id: 2,
    subregions: [
      {
        subregion: 'Timberfall',
        attribute: 'Non-attribute',
        monomer: 3,
        polymer: 3,
        organic: 3,
        inorganic: 3,
      },
      {
        subregion: 'Moonlight',
        attribute: 'Non-attribute',
        monomer: 3,
        polymer: 3,
        organic: 3,
        inorganic: 3,
      },
      {
        subregion: 'Ruins',
        attribute: 'Chill',
        monomer: 6,
        polymer: 17,
        organic: 0,
        inorganic: 0,
      },
      {
        subregion: 'Lost Supply',
        attribute: 'Fire',
        monomer: 0,
        polymer: 19,
        organic: 4,
        inorganic: 0,
      },
    ],
  },
  'Echo Swamp': {
    id: 3,
    subregions: [
      {
        subregion: 'Muskeg Swamp',
        attribute: 'Fire',
        monomer: 5,
        polymer: 0,
        organic: 18,
        inorganic: 0,
      },
      {
        subregion: 'Derelict Covert',
        attribute: 'Toxic',
        monomer: 0,
        polymer: 0,
        organic: 3,
        inorganic: 20,
      },
      {
        subregion: 'Abandoned Zone',
        attribute: 'Toxic',
        monomer: 0,
        polymer: 6,
        organic: 0,
        inorganic: 17,
      },
    ],
  },
  'Agna Desert': {
    id: 4,
    subregions: [
      {
        subregion: 'Miragestone',
        attribute: 'Non-attribute',
        monomer: 3,
        polymer: 3,
        organic: 3,
        inorganic: 3,
      },
      {
        subregion: 'The Storage',
        attribute: 'Fire',
        monomer: 4,
        polymer: 0,
        organic: 19,
        inorganic: 0,
      },
      {
        subregion: 'The Mining Site',
        attribute: 'Electric',
        monomer: 20,
        polymer: 3,
        organic: 0,
        inorganic: 0,
      },
      {
        subregion: 'Vermillion Waste',
        attribute: 'Electric',
        monomer: 0,
        polymer: 0,
        organic: 20,
        inorganic: 3,
      },
    ],
  },
  'White Gulch': {
    id: 5,
    subregions: [
      {
        subregion: 'Moongrave Basin',
        attribute: 'Non-attribute',
        monomer: 3,
        polymer: 3,
        organic: 3,
        inorganic: 3,
      },
      {
        subregion: 'Observatory',
        attribute: 'Chill',
        monomer: 4,
        polymer: 19,
        organic: 0,
        inorganic: 0,
      },
      {
        subregion: 'Shipment Base',
        attribute: 'Toxic',
        monomer: 0,
        polymer: 0,
        organic: 3,
        inorganic: 20,
      },
      {
        subregion: 'Hatchery',
        attribute: 'Fire',
        monomer: 0,
        polymer: 0,
        organic: 19,
        inorganic: 4,
      },
      {
        subregion: 'The Mountaintops',
        attribute: 'Toxic',
        monomer: 0,
        polymer: 7,
        organic: 0,
        inorganic: 16,
      },
    ],
  },
  Hagios: {
    id: 6,
    subregions: [
      {
        subregion: 'Fractured Monolith',
        attribute: 'Non-attribute',
        monomer: 3,
        polymer: 3,
        organic: 3,
        inorganic: 3,
      },
      {
        subregion: 'The Corrupted Zone',
        attribute: 'Fire',
        monomer: 6,
        polymer: 0,
        organic: 17,
        inorganic: 0,
      },
      {
        subregion: 'Dune Base',
        attribute: 'Fire',
        monomer: 0,
        polymer: 0,
        organic: 18,
        inorganic: 5,
      },
    ],
  },
  Fortress: {
    id: 7,
    subregions: [
      {
        subregion: 'Defense Line',
        attribute: 'Chill',
        monomer: 3,
        polymer: 20,
        organic: 0,
        inorganic: 0,
      },
      {
        subregion: 'Fallen Ark',
        attribute: 'Electric',
        monomer: 17,
        polymer: 0,
        organic: 0,
        inorganic: 6,
      },
      {
        subregion: 'Frozen Valley',
        attribute: 'Chill',
        monomer: 0,
        polymer: 19,
        organic: 4,
        inorganic: 0,
      },
    ],
  },
} as const;

type VoidFragmentData = typeof voidFragmentData;

export type ZoneTypes = keyof VoidFragmentData;
export const zonesArray = Object.keys(voidFragmentData) as ZoneTypes[];

export const fragmentsArray = ['Monomer', 'Polymer', 'Organic', 'Inorganic'] as const;

export const attributesArray = ['Non-attribute', 'Chill', 'Fire', 'Electric', 'Toxic'] as const;

export const voidFragmentTableHeaders = ['Zone', 'Subregion', 'Attribute', ...fragmentsArray] as const;

export const fragmentOptions: FilterOptionsData[] = [
  {
    label: 'Fragment',
    name: 'fragment',
    data: [...fragmentsArray],
  },
  {
    label: 'Attribute',
    name: 'attribute',
    data: [...attributesArray],
  },
] as const;

export const zoneOptions: FilterOptionsData[] = [
  {
    label: 'Zone',
    name: 'zone',
    data: [...zonesArray],
  },
  ...zonesArray.map(key => ({
    label: key,
    name: key,
    data: voidFragmentData[key].subregions.map(({ subregion }) => subregion),
  })),
];
