export type PathType = {
  path?: string;
  label?: string;
  options?: PathType[];
  isExternal?: boolean;
};

export const paths: PathType[] = [
  {
    path: '/',
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
    path: '/ehp-calc',
    label: 'Effective HP Calculator',
  },
  {
    path: '/external-components',
    label: 'External Components',
  },
] as const;
