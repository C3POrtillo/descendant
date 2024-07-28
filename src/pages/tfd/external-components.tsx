import axios from 'axios';
import Error from 'next/error';
import { useState } from 'react';

import type { FormattedExternalComponentData } from '@/components/externalComponents/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import ExternalComponentCard from '@/components/externalComponents/externalComponentCard';
import { formatExternalComponentData } from '@/components/externalComponents/utils';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';

interface ExternalComponentProps {
  error: boolean;
  externalComponents: FormattedExternalComponentData[];
}

const ExternalComponents: FC<ExternalComponentProps> = ({ error, externalComponents }) => {
  const [isError] = useState(error || !externalComponents);

  if (isError) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Header />
      <Container>
        <div className="grid grid-cols-2">
          <div>Stat Filler</div>
          <div className="grid auto-cols-fr">
            {externalComponents.map(({ external_component_id: id, ...props }) => (
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

  return {
    props: {
      externalComponents: formatExternalComponentData(components),
    },
  };
};

export default ExternalComponents;
