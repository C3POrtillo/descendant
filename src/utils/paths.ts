export type PathType = {
  path?: string;
  label?: string;
  options?: PathType[];
  isExternal?: boolean;
};

export const breadcrumbLabels = {
  dps: 'Weapon DPS',
  'ehp-calc': 'Effective HP Calculator',
} as Record<string, string>;

export const root = [
  {
    path: '/tfd',
  },
] as const;

export const tfd = [
  {
    path: '',
    label: 'The First Descendant Assistant',
  },
  {
    label: 'Equipment Data',
    options: [
      {
        path: '/dps',
        label: breadcrumbLabels['dps'],
      },
      {
        path: '/external-components',
        label: 'External Components',
      },
      {
        path: '/reactors',
        label: 'Reactors',
      },
    ],
  },
  {
    label: 'Module Data',
    options: [
      {
        path: '/modules',
        label: 'Modules',
      },
      {
        path: '/modules',
        label: 'Combinations',
      },
      {
        path: '/modules/costs',
        label: 'Upgrade Costs',
      },
    ],
  },
  {
    label: 'Farming',
    options: [
      {
        path: '/wishlist',
        label: 'Wishlist',
      },
      {
        path: '/descendants',
        label: 'Descendants',
      },
      {
        path: '/void-shards',
        label: 'Void Shards',
      },
    ],
  },
  {
    path: '/ehp-calc',
    label: breadcrumbLabels['ehp-calc'],
  },
] as PathType[];
