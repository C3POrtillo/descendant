import { useRouter } from 'next/router';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import TFDLink from '@/components/tfd/header/Link';
import { breadcrumbLabels } from '@/utils/paths';
import { titleCase } from '@/utils/utils';

interface BreadcrumbsProps {
  slug?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ slug }) => {
  const router = useRouter();
  const paths = router.pathname.split('/').slice(2);
  if (slug && paths[paths.length - 1].match(/\[.*\]/)) {
    paths.pop();
    paths.push(slug);
  }

  return (
    <Container className="m-0 justify-start">
      <div className="flex flex-row items-center gap-2 lg:mx-16 2xl:mx-24">
        {paths.map((path, index) => {
          const label = breadcrumbLabels[path] || titleCase(path);

          return (
            <>
              {/* eslint-disable-next-line react/no-array-index-key */}
              <p key={index}>/</p>
              <TFDLink
                key={path}
                className="text-hover bg-hover rounded-md px-2 py-1"
                label={label}
                path={`/${paths.join('/')}`}
                disabled={index === paths.length - 1}
              />
            </>
          );
        })}
      </div>
    </Container>
  );
};

export default Breadcrumbs;
