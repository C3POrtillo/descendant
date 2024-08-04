export type PathType = {
  path?: string;
  label?: string;
  options?: PathType[];
  isExternal?: boolean;
};

export const paths = [
  {
    path: '',
    label: 'The First Descendant Data',
  },
  {
    label: 'Charts',
    options: [
      {
        path: '/dps',
        label: 'Weapon DPS',
      },
      {
        path: '/void-shards',
        label: 'Void Fragments',
      },
    ],
  },
  {
    path: '/external-components',
    label: 'External Components',
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
