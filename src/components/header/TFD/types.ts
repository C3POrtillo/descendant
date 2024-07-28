export type PathType = {
  path?: string;
  label?: string;
  options?: PathType[];
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
        label: 'Void Fragment',
      },
    ],
  },
  {
    path: '/ehp-calc',
    label: 'Effective HP Calculator',
  },
] as const;
