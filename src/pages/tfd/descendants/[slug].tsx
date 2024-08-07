import { useState } from 'react';

import type { DescendantAPIData, FormattedDescendantData } from '@/components/tfd/descendants/types';
import type { Pattern } from '@/components/tfd/patterns/types';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Button from '@/components/inputs/Button/Button';
import Table from '@/components/table/Table';
import DescendantCard from '@/components/tfd/descendants/DescendantCard';
import SkillCard from '@/components/tfd/descendants/SkillCard';
import { formatDescendantData } from '@/components/tfd/descendants/utils';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import PatternRow from '@/components/tfd/patterns/PatternRow';
import TableProps from '@/components/tfd/patterns/TableProps';
import { hardPatterns, normalPatterns } from '@/components/tfd/patterns/types';
import { filterPatternData } from '@/components/tfd/patterns/utils';
import { kebabCase } from '@/utils/utils';

interface DescendantProps {
  seo: NextSeoProps;
  descendant: FormattedDescendantData;
  normalPatternData: Pattern[];
  hardPatternData: Pattern[];
}

const Descendant: FC<DescendantProps> = ({ seo, descendant, normalPatternData, hardPatternData }) => {
  const [patterns, setPatterns] = useState(normalPatternData);
  const [difficulty, setDifficulty] = useState('normal' as 'normal' | 'hard');

  const isNormal = difficulty === 'normal';

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="descendant-data flex flex-col items-center gap-4 rounded-xl border-2 border-white bg-slate-900 pt-4 shadow-md shadow-black xl:flex-row xl:pl-4 xl:pt-0">
          <div>
            <DescendantCard {...descendant} />
          </div>
          <div className="flex w-full flex-col border-white p-2 xl:border-l-2 xl:p-0">
            <span className="mb-1 border-b-2 border-white p-2 text-2xl font-bold lg:text-3xl">Abilities</span>
            {descendant.descendant_skill.map(skill => (
              <SkillCard key={skill.skill_name} {...skill} />
            ))}
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex w-full flex-col justify-center gap-2 self-center md:w-min md:flex-row">
          <Button
            onClick={() => {
              setPatterns(normalPatternData);
              setDifficulty('normal');
            }}
            disabled={isNormal}
          >
            Normal Patterns
          </Button>
          <Button
            onClick={() => {
              setPatterns(hardPatternData);
              setDifficulty('hard');
            }}
            disabled={!isNormal}
          >
            Hard Patterns
          </Button>
        </div>
      </Container>
      <Container>
        <Table
          body={patterns.map(data => (
            <PatternRow key={data.pattern + data.variant} data={data} />
          ))}
          {...TableProps[difficulty]}
        />
      </Container>
      <Footer />
    </>
  );
};

export const getStaticPaths = (async () => {
  if (!process.env.DESCENDANT_JSON) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const descendants = (await (await fetch(process.env.DESCENDANT_JSON)).json()) as DescendantAPIData[];
  const paths = descendants.map(descendant => ({
    params: {
      slug: kebabCase(descendant.descendant_name),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  if (!process.env.DESCENDANT_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const slug = params?.slug as string;
  const descendants = (await (await fetch(process.env.DESCENDANT_JSON)).json()) as DescendantAPIData[];
  const descendant = formatDescendantData(
    descendants.filter(({ descendant_name }) => slug === kebabCase(descendant_name)),
  )[0];

  const name = descendant.descendant_name;
  const title = `The First Descendant (TFD) ${name} Data`;
  const description = `${name} is a ${descendant.attribute} descendant in The First Descendant (TFD). 
    Contains ${name}'s max stats at Lvl. 40 and skill descriptions`;

  return {
    props: {
      descendant,
      normalPatternData: filterPatternData(name, normalPatterns as unknown as Pattern[]),
      hardPatternData: filterPatternData(name, hardPatterns as unknown as Pattern[]),
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/descendants',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
  };
}) satisfies GetStaticProps;

export default Descendant;
