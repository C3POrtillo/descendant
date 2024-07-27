import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import type { FC } from 'react';

const paths = [
  {
    path: '/tfd',
    label: 'The First Descendant Data',
  },
  {
    path: '/dps',
    label: 'Weapon DPS Chart',
  },
  {
    path: '/void-shards',
    label: 'Void Fragment Chart',
  },
];

const Header: FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <header className="sticky-header header-links flex flex-col place-items-center justify-center gap-4 bg-slate-800 py-6 text-center shadow-md shadow-black">
      <div className="h-14">
        <Link href={paths[0].path} className={`tfd-link ${currentPath === paths[0].path ? 'disabled-link' : ''}`}>
          <h1 className="content-center text-6xl font-semibold">{paths[0].label}</h1>
        </Link>
      </div>
      <div className="flex h-8 flex-row gap-4 text-3xl">
        {paths.slice(1).map(({ path, label }) => {
          const target = `/tfd${path}`;

          return (
            <Link key={path} href={target} className={`tfd-link ${currentPath === target ? 'disabled-link' : ''}`}>
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
