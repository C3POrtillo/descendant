import type { FormattedReactorData, ReactorAPIData } from '@/components/tfd/reactor/types';
import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Carousel from '@/components/carousel/Carousel';
import Container from '@/components/container/Container';
import Icon from '@/components/icon/Icon';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import ReactorCard from '@/components/tfd/reactor/ReactorCard';
import { reactorArches, reactorAttributes, reactorStats, unusedCombinations } from '@/components/tfd/reactor/types';
import { formatStat } from '@/components/tfd/reactor/utils';
import { getLabelClass, sortData } from '@/utils/utils';

interface ReactorsProps {
  seo: NextSeoProps;
  reactors: FormattedReactorData[];
  date: string;
}

const Reactors: FC<ReactorsProps> = ({ reactors, seo, date }) => {
  const reactorAttackStats = {
    'Skill Power': reactors[0].skill_atk_power,
    'Sub Attack Power': reactors[0].sub_skill_atk_power,
  };
  const reactorCards = reactors.map(reactor => <ReactorCard key={reactor.reactor_name} {...reactor} />);

  const reactorCombos = Object.entries(reactorAttributes).flatMap(([name, { type, icon }]) =>
    Object.entries(reactorArches).map(([archeName, { type: archeType, icon: archeIcon }]) => {
      const labelClass = getLabelClass(type);
      const label = [name, archeName].join('\n');
      const borderClass = unusedCombinations.includes(label) ? 'border-red-400' : 'border-black';

      return (
        <div
          key={`${name}-${archeName}`}
          className={[
            'flex flex-row items-center justify-between gap-2 whitespace-pre-wrap rounded-xl border-2 bg-slate-800 px-5 py-2 text-center shadow-md shadow-black',
            borderClass,
            labelClass,
          ].join(' ')}
        >
          <Icon src={icon} alt={type} />
          {label}
          <Icon src={archeIcon} alt={archeType} />
        </div>
      );
    }),
  );

  const attackStats = Object.entries(reactorAttackStats).map(([label, stat]) => (
    <div className="flex flex-col justify-center py-2" key={label}>
      <div>{label}</div>
      <div className="text-4xl">{stat}</div>
    </div>
  ));

  const optimization = (
    <div className="flex flex-col items-center justify-center bg-slate-800 py-2 text-center text-xl">
      <div className="">{'Optimization Skill Power Multiplier'}</div>
      <div className="flex flex-col">
        <div className="label-rare">Rare: {reactorStats.rare}</div>
        <div className="label-ultimate">Ultimate: {reactorStats.ultimate}</div>
      </div>
    </div>
  );

  const stats = reactorStats.subStats.map(stat => (
    <div
      key={stat}
      className="flex h-min max-w-full items-center justify-center rounded-xl border-2 border-black bg-slate-800 px-5 py-2 text-center shadow-md shadow-black sm:whitespace-pre-wrap"
    >
      {formatStat(stat)}
    </div>
  ));

  return (
    <>
      <Header seo={seo} />
      <Container>
        <fieldset className="reactor-data flex flex-col justify-center overflow-hidden rounded-xl border-2 border-black bg-slate-900 shadow-lg shadow-black xl:w-1/2">
          <legend className="px-2 text-center sm:px-4">
            <h2 className="text-3xl md:text-4xl">Reactor Stats</h2>
          </legend>
          <div className="self-center p-4 xl:min-w-full">
            {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
            <div className="hidden justify-center gap-4 xl:flex xl:min-w-[780px] xl:flex-row xl:flex-wrap 2xl:flex-nowrap">
              {reactorCards}
            </div>
            <Carousel slides={reactorCards} className="xl:hidden" width="max-w-[85vw] sm:max-w-[50vw]" />
          </div>
          <div className="border-y-2 border-black bg-slate-800 text-center text-xl">
            <div className="hidden grid-cols-3 md:grid">{[attackStats[0], optimization, attackStats[1]]}</div>
            <div className="flex flex-col items-center md:hidden">
              <div className="flex w-full flex-row justify-around">{attackStats}</div>
              {optimization}
            </div>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-4 bg-slate-700 p-4 text-xl">
            {stats}
          </div>
        </fieldset>
      </Container>
      <Container>
        <fieldset className="reactor-data flex w-full flex-col justify-center gap-4 rounded-xl border-2 border-black bg-slate-900 p-4 text-center shadow-lg shadow-black sm:w-auto">
          <legend className="px-2 sm:px-4">
            <h2 className="text-3xl md:text-4xl">Reactor Types</h2>
          </legend>
          <div className="flex flex-col text-xl">
            <p>
              As of <span className="text-yellow-200">{date}</span>
            </p>
            <p>
              No Descendant benefits from reactors marked in <span className="text-red-400">red</span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-lg sm:text-xl md:grid-cols-2 lg:grid-cols-4">{reactorCombos}</div>
        </fieldset>
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  if (!process.env.REACTOR_JSON) {
    return {
      props: {
        error: true,
      },
    };
  }

  const reactors = (await (await fetch(process.env.REACTOR_JSON)).json()) as ReactorAPIData[];
  const baseReactorRegex =
    /^(Frozen|Burning|Tingling|Materialized|Toxic) (Mechanics|Mixture|Phase|Singularity) Reactor$/;

  const uniqueAttributeFilter = (data: ReactorAPIData[]): ReactorAPIData[] => {
    const seenAttributes = new Set<string>();

    return data.filter(reactor => {
      if (reactor.reactor_tier === 'Ultimate' && baseReactorRegex.test(reactor.reactor_name)) {
        const firstWord = reactor.reactor_name.split(' ')[0];
        if (!seenAttributes.has(firstWord)) {
          seenAttributes.add(firstWord);

          return true;
        }
      }

      return false;
    });
  };

  const formattedReactors = uniqueAttributeFilter(reactors)
    .map(({ reactor_name, reactor_skill_power, image_url }) => {
      const data = { image_url, ...reactor_skill_power[99] } as FormattedReactorData;
      const words = reactor_name.split(' ');
      const name = `${words[0]} ${words[2]}`;
      data['reactor_name'] = name;

      return data;
    })
    .sort((a, b) => {
      if (a.reactor_name.includes('Materialized')) {
        return -1;
      } else if (b.reactor_name.includes('Materialized')) {
        return 1;
      }

      return sortData(a.reactor_name, b.reactor_name);
    });

  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  const title = 'The First Descendant (TFD) Reactor Data';
  const description = `Tool for Reactor data in The First Descendant (TFD).
  Contains stats for a Reactor at level 100. 
  Lists possible sub stats (without values) and all combinations of Reactors.`;

  return {
    props: {
      reactors: formattedReactors,
      date: `${month}/${day}/${year}`,
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/external-components',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
    revalidate: 86400,
  };
};

export default Reactors;
