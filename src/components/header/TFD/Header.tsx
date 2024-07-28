import type { FC } from 'react';

import Accordion from '@/components/accordion/Accordion';
import TFDLink from '@/components/header/TFD/Link';
import { paths } from '@/components/header/TFD/types';

const Header: FC = () => (
  <header className="sticky-header header-links flex flex-col place-items-center justify-center gap-4 bg-slate-800 py-6 text-center shadow-md shadow-black">
    <div className="h-14">
      <TFDLink path={paths[0].path}>
        <h1 className="content-center text-6xl font-semibold">{paths[0].label}</h1>
      </TFDLink>
    </div>
    <div className="flex min-h-8 flex-row gap-4 text-3xl">
      {paths.slice(1).map(data => {
        if (data.options && data.label?.length) {
          const { label, options } = data;

          const links = options.map(nestedData => <TFDLink key={nestedData.path} {...nestedData} />);

          return <Accordion key={label} label={label} options={links} />;
        }

        return <TFDLink key={data.path} {...data} />;
      })}
    </div>
  </header>
);

export default Header;
