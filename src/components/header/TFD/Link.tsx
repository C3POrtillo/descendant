import Link from 'next/link';
import { useRouter } from 'next/router';

import type { PathType } from '@/components/header/TFD/types';
import type { FC, PropsWithChildren } from 'react';

type TFDLinkProps = PathType & PropsWithChildren;

const TFDLink: FC<TFDLinkProps> = ({ path, label, children }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const target = `/tfd${path}`;

  return (
    <Link key={path} href={target} className={`tfd-link ${currentPath === target ? 'disabled-link' : ''}`}>
      {label}
      {children}
    </Link>
  );
};

export default TFDLink;
