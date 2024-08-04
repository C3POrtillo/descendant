import type { FC } from 'react';

import Accordion from '@/components/accordion/Accordion';
import Dropdown from '@/components/dropdown/Dropdown';
import TFDLink from '@/components/tfd/header/Link';
import { paths } from '@/components/tfd/header/types';

const Header: FC = () => {
  const navLinks = paths.slice(1).map(data => {
    if (data.options && data.label?.length) {
      const { label, options } = data;

      const links = options.map(nestedData => <TFDLink className="tfd-link" key={nestedData.path} {...nestedData} />);

      return (
        <Dropdown key={label} label={label}>
          {links}
        </Dropdown>
      );
    }

    return <TFDLink className="tfd-link" key={data.path} {...data} />;
  });

  const homeLink = (
    <TFDLink className="home-link text-nowrap lg:p-0" path={paths[0].path}>
      <h1 className="text-2xl font-semibold lg:text-4xl">{paths[0].label}</h1>
    </TFDLink>
  );

  return (
    <header className="sticky-header flex flex-col place-items-center justify-center gap-4 bg-slate-800 text-center shadow-md shadow-black lg:py-6">
      <div className="hidden h-14 content-center lg:flex">{homeLink}</div>
      <div className="hidden min-h-8 flex-row gap-4 lg:flex">{navLinks}</div>

      <div className="flex min-h-8 w-full flex-row lg:hidden">
        <Accordion label={<div className="flex">{homeLink}</div>} icon="fa-bars">
          {navLinks}
        </Accordion>
      </div>
    </header>
  );
};

export default Header;