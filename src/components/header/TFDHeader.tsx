import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import type { FC } from 'react';

const paths = [
  {
    path: 'dps',
    label: 'Weapon DPS Chart',
  },
  {
    path: 'void-shards',
    label: 'Void Fragment Chart',
  },
];

const Header: FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="flex h-48 flex-col place-items-center justify-center gap-4 bg-slate-800 text-center">
      <h1 className="content-center text-5xl font-semibold">The First Descendant Data</h1>
      <div className="header-links flex flex-row gap-4 text-2xl">
        {paths.map(({ path, label }) => {
          const target = `/tfd/${path}`;

          return (
            <Link key={path} href={target} className={`tfd-link ${currentPath === target ? 'disabled-link' : ''}`}>
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
