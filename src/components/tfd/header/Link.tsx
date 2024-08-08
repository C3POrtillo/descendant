import Link from 'next/link';
import { useRouter } from 'next/router';

import type { PathType } from '@/utils/paths';
import type { FC, PropsWithChildren } from 'react';

interface TFDLinkProps extends PathType, PropsWithChildren {
  className?: string;
  disabled?: boolean;
}

const TFDLink: FC<TFDLinkProps> = ({ path, label, isExternal, className, disabled, children }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const target = isExternal && path ? path : `/tfd${path}`;
  const disabledClass = (disabled ?? currentPath === target) && 'disabled-link';

  return (
    <Link key={path} href={target} className={[className, disabledClass].filter(string => string).join(' ')}>
      {label}
      {children}
    </Link>
  );
};

export default TFDLink;
