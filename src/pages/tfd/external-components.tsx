import axios from 'axios';
import Error from 'next/error';
import { useEffect, useState } from 'react';

import type {
  BasicDataType,
  ExternalComponentTypes,
  ExternalComponentsFilterMap,
  FormattedBasicData,
  FormattedExternalComponentData,
} from '@/components/tfd/externalComponents/types';
import type { TiersType } from '@/utils/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import Table from '@/components/table/Table';
import ExternalComponentBasicHeader from '@/components/tfd/externalComponents/ExternalComponentBasicHeader';
import ExternalComponentCard from '@/components/tfd/externalComponents/ExternalComponentCard';
import {
  externalComponentStats,
  externalComponentsArray,
  filterOptions,
} from '@/components/tfd/externalComponents/types';
import { getSortedExternalComponentData } from '@/components/tfd/externalComponents/utils';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import { tiers } from '@/utils/types';
import { createFilterMap, sortData } from '@/utils/utils';

interface ExternalComponentProps {
  filterMap: ExternalComponentsFilterMap;
  error: boolean;
  formattedBasicComponents: FormattedBasicData;
  setComponents: FormattedExternalComponentData[];
  seo: NextSeoProps;
}

const ExternalComponents: FC<ExternalComponentProps> = ({
  filterMap,
  error,
  formattedBasicComponents,
  setComponents,
  seo,
}) => {
  const [filteredSet, setFilteredSet] = useState(setComponents);
  const [filter, setFilter] = useState(filterMap);
  const [isError] = useState(error || !setComponents || !formattedBasicComponents);

  useEffect(() => {
    const currentFilter = setComponents.reduce((acc, component) => {
      const componentType = component['external_component_equipment_type'] as ExternalComponentTypes;
      const componentTier = component['external_component_tier'] as TiersType;
      const validComponent = filter[componentType] && filter[componentTier];

      if (validComponent) {
        acc.push(component);
      }

      return acc;
    }, [] as FormattedExternalComponentData[]);

    setFilteredSet(currentFilter);
  }, [filter]);

  if (isError) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(externalComponentStats.substats).map(([component, substats]) => (
            <Table
              className="h-min"
              key={component}
              label={component}
              labelSize="text-2xl"
              headers={
                <ExternalComponentBasicHeader
                  component={component}
                  {...formattedBasicComponents[component as ExternalComponentTypes]}
                />
              }
              body={substats.map(substat => (
                <tr key={substat}>
                  <td className="p-2 text-xl font-semibold">{substat}</td>
                </tr>
              ))}
            />
          ))}
        </div>
      </Container>
      <Container>
        <div className="flex flex-col gap-1 2xl:flex-row 2xl:gap-4">
          <div className="2xl:sticky-below-header flex h-min flex-row justify-center gap-4 pt-5 2xl:w-1/6 2xl:flex-col">
            <div className="external-component-data flex flex-row flex-wrap justify-center gap-4">
              <FilterOptions filterOptions={filterOptions} filter={filter} setFilter={setFilter} />
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-9 2xl:w-5/6">
            <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2 md:px-0 xl:grid-cols-4">
              {filteredSet.map(({ external_component_id: id, ...props }) => (
                <ExternalComponentCard key={id} {...props} />
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  if (!process.env.EXTERNAL_COMPONENT_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const components = (await axios.get(process.env.EXTERNAL_COMPONENT_JSON)).data;
  const sortedData = getSortedExternalComponentData(components);

  const basicComponents = {} as FormattedBasicData;
  const setComponents: FormattedExternalComponentData[] = [];

  sortedData.forEach(component => {
    if (component.set_option_detail?.[0]) {
      setComponents.push(component);
    } else {
      const { external_component_equipment_type, external_component_tier, stat, image_url } = component;
      if (!basicComponents[external_component_equipment_type]) {
        basicComponents[external_component_equipment_type] = {} as BasicDataType;
      }

      if (!basicComponents[external_component_equipment_type].image_url) {
        basicComponents[external_component_equipment_type]['image_url'] = image_url;
      }

      if (!basicComponents[external_component_equipment_type][external_component_tier]?.length) {
        basicComponents[external_component_equipment_type][external_component_tier] = [stat];
      } else {
        basicComponents[external_component_equipment_type][external_component_tier].push(stat);
      }
    }
  });

  const filterMap = createFilterMap([...tiers, ...externalComponentsArray]) as ExternalComponentsFilterMap;
  const title = 'The First Descendant (TFD) External Component Data';
  const description = `Tool for External Component data in The First Descendant (TFD). 
    Contains main stat, sub stat, set data for Auxiliary Power, Sensor, Memory, and Processor`;

  return {
    props: {
      filterMap,
      setComponents: setComponents.sort((a, b) =>
        sortData(a.set_option_detail?.[0].set_option as string, b.set_option_detail?.[0].set_option as string),
      ),
      formattedBasicComponents: basicComponents,
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
    revalidate: 86400,
  };
};

export default ExternalComponents;
