import React, { useState } from 'react';

import type { DescendantAPIData, FormattedDescendantData, NormalDropType } from '@/components/tfd/descendants/types';
import type { Pattern } from '@/components/tfd/patterns/types';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Button from '@/components/inputs/Button/Button';
import Table from '@/components/table/Table';
import DescendantCard from '@/components/tfd/descendants/DescendantCard';
import SkillCard from '@/components/tfd/descendants/SkillCard';
import { normalMissionDrops } from '@/components/tfd/descendants/types';
import { formatDescendantData } from '@/components/tfd/descendants/utils';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import NormalMissionTable from '@/components/tfd/patterns/NormalMissionTable';
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
  normalMissionData?: NormalDropType;
}

const Descendant: FC<DescendantProps> = ({
  seo,
  descendant,
  normalPatternData,
  hardPatternData,
  normalMissionData,
}) => {
  const [patterns, setPatterns] = useState(normalPatternData.length ? normalPatternData : hardPatternData);
  const [difficulty, setDifficulty] = useState((normalPatternData.length ? 'normal' : 'hard') as 'normal' | 'hard');

  const isNormal = difficulty === 'normal';
  const hasNormalData = !!normalPatternData.length;
  const hasHardData = !!hardPatternData.length;

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="descendant-data flex w-full flex-col items-center overflow-hidden rounded-xl border-2 border-black bg-slate-800 shadow-lg shadow-black xl:flex-row">
          <div className="p-4">
            <DescendantCard {...descendant} />
          </div>
          <div className="flex flex-col">
            <span className="p-4 text-2xl font-bold md:p-2 lg:pt-4 lg:text-3xl">Abilities</span>
            <div className="skill-card-deck">
              {descendant.descendant_skill.map(skill => (
                <SkillCard key={skill.skill_name} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </Container>
      {hasNormalData && hasHardData && (
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
      )}
      <Container>
        {(hasNormalData || hasHardData) && (
          <Table
            body={patterns.map(data => (
              <PatternRow key={data.pattern + data.variant} data={data} />
            ))}
            {...TableProps[difficulty]}
          />
        )}
        {normalMissionData && <NormalMissionTable data={normalMissionData} />}
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
  const title = `The First Descendant (TFD) ${name} Data and Farm Locations`;
  const description = `${name} is a ${descendant.attribute} descendant in The First Descendant (TFD). 
    Contains ${name}'s max stats at Lvl. 40 and skill/ability descriptions.
    Displays where to farm ${name} patterns/blueprints.`;

  const normalMissionData = normalMissionDrops[name as keyof typeof normalMissionDrops];

  return {
    props: {
      descendant,
      normalPatternData: filterPatternData(name, normalPatterns as unknown as Pattern[]),
      hardPatternData: filterPatternData(name, hardPatterns as unknown as Pattern[]),
      normalMissionData,
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
