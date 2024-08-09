import { type FC, useEffect, useState } from 'react';

import type { ModuleAPIData, ModuleFilterMap } from '@/components/tfd/module/types';
import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';

import Container from '@/components/container/Container';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import Text from '@/components/inputs/Text/Text';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import ModuleCard from '@/components/tfd/module/ModuleCard';
import {
  moduleClasses,
  moduleOptions,
  moduleSockets,
  moduleTiers,
  moduleTypes,
  typeOptions,
} from '@/components/tfd/module/types';
import { createFilterMap } from '@/utils/utils';

interface IndexProps {
  seo: NextSeoProps;
  modules: ModuleAPIData[];
  filterMap: ModuleFilterMap;
}

const Index: FC<IndexProps> = ({ seo, modules, filterMap }) => {
  const [filteredModules, setFilteredModules] = useState(modules);
  const [searchFilter, setSearchFilter] = useState('');
  const [filter, setFilter] = useState(filterMap);

  useEffect(() => {
    const currentFilter = modules.reduce((acc, module) => {
      const regex = new RegExp(searchFilter, 'i');
      const { module_name, module_tier, module_socket_type, module_class, module_type, module_stat } = module;
      const isValidModule =
        filter[module_tier] && filter[module_socket_type] && filter[module_class] && filter[module_type || 'None'];
      const isValidSearch = !searchFilter || regex.test(module_name) || regex.test(module_stat[0].value);

      if (isValidModule && isValidSearch) {
        acc.push(module);
      }

      return acc;
    }, [] as ModuleAPIData[]);

    setFilteredModules(currentFilter);
  }, [filter, searchFilter]);

  const moduleCards = filteredModules.map(module => (
    <div key={module.module_id}>
      <ModuleCard {...module} />
    </div>
  ));

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="module-data flex flex-col justify-center gap-4 2xl:flex-row">
          <div className="2xl:sticky-below-header flex h-min flex-row justify-center gap-4 2xl:w-1/6 2xl:flex-col">
            {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
            <div className="2xl:scroll-bar-left scroll-bar-thin 2xl: mt-4 flex flex-row flex-wrap items-start justify-center gap-4 2xl:max-h-[84vh] 2xl:overflow-auto 2xl:px-2 2xl:pb-2">
              <div className="w-full rounded-md border-2 border-black bg-slate-900 p-2 shadow-md shadow-black 2xl:mt-4">
                <Text label="Name/Stats" setState={setSearchFilter} placeholder="Search..." />
              </div>
              <FilterOptions filterOptions={moduleOptions} filter={filter} setFilter={setFilter} type="accordion" />
              <FilterOptions
                checkboxContainerClasses="grid-cols-1 md:grid-cols-4 2xl:grid-cols-1"
                filterOptions={[typeOptions]}
                filter={filter}
                setFilter={setFilter}
                type="accordion"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-row flex-wrap justify-center gap-x-4 gap-y-8 2xl:w-5/6">{moduleCards}</div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = (async () => {
  if (!process.env.MODULE_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const filterMap = createFilterMap([
    ...moduleTiers,
    ...moduleClasses,
    ...moduleSockets,
    ...moduleTypes,
  ]) as ModuleFilterMap;

  const modules = (await (await fetch(process.env.MODULE_JSON)).json()) as ModuleAPIData[];

  const title = 'The First Descendant (TFD) All Module Data';
  const description = `Tool for all module data in The First Descendant (TFD). 
    Displays all modules and their stats at every level`;

  return {
    props: {
      modules,
      filterMap,
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/modules',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
  };
}) satisfies GetStaticProps;

export default Index;
