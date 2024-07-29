import axios from 'axios';
import Error from 'next/error';
import Image from 'next/image';
import { useState } from 'react';

import type {
  ExternalComponentTypes,
  FormattedBasicData,
  FormattedExternalComponentData,
} from '@/components/externalComponents/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import ExternalComponentCard from '@/components/externalComponents/ExternalComponentCard';
import { externalComponentStats } from '@/components/externalComponents/types';
import { formatBasicComponentData, getSortedExternalComponentData } from '@/components/externalComponents/utils';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';
import Table from '@/components/table/Table';
import ExternalComponentBasicHeader from '@/components/externalComponents/ExternalComponentBasicHeader';

interface ExternalComponentProps {
  error: boolean;
  formattedBasicComponents: FormattedBasicData;
  setComponents: FormattedExternalComponentData[];
}

const ExternalComponents: FC<ExternalComponentProps> = ({ error, formattedBasicComponents, setComponents }) => {
  const [filteredSet, setFilteredSet] = useState(setComponents);

  const [filter, setFilter] = useState({});
  const [isError] = useState(error || !setComponents || !formatBasicComponentData);

  if (isError) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-row gap-4">
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
        <div className="flex  w-5/6 flex-col gap-4">
          <h2>Set Components</h2>
          <div className="grid grid-cols-4 gap-4">
            {filteredSet.map(({ external_component_id: id, ...props }) => (
              <ExternalComponentCard key={id} {...props} />
            ))}
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

  const basicComponents: FormattedExternalComponentData[] = [];
  const setComponents: FormattedExternalComponentData[] = [];

  sortedData.forEach(component => {
    if (component.set_option_detail?.length) {
      setComponents.push(component);
    } else {
      basicComponents.push(component);
    }
  });

  const formattedBasicComponents = formatBasicComponentData(basicComponents);

  return {
    props: {
      basicComponents,
      setComponents,
      formattedBasicComponents,
    },
  };
};

export default ExternalComponents;
