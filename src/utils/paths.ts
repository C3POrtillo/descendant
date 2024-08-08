export type PathType = {
  path?: string;
  label?: string;
  options?: PathType[];
  isExternal?: boolean;
};

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
        label: 'Weapon DPS',
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
        label: 'Void Fragments',
      },
    ],
  },
  {
    path: '/ehp-calc',
    label: 'Effective HP Calculator',
  },
] as PathType[];
