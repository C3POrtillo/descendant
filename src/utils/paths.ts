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
    label: 'Data',
    options: [
      {
        path: '/dps',
        label: 'Weapon DPS',
      },
      {
        path: '/void-shards',
        label: 'Void Fragments',
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
    path: '/wishlist',
    label: 'Wishlist',
  },
  {
    path: '/ehp-calc',
    label: 'Effective HP Calculator',
  },
] as PathType[];
