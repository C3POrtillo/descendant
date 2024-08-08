import { type FC, useEffect, useState } from 'react';

import type { FilterOptionsData } from '@/components/inputs/types';
import type { BlueprintFilterMap, MissionFilterMap, Pattern } from '@/components/tfd/patterns/types';
import type { GetStaticProps } from 'next/types';
import type { NextSeoProps } from 'next-seo';

import Container from '@/components/container/Container';
import Button from '@/components/inputs/Button/Button';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import Table from '@/components/table/Table';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import PatternRow from '@/components/tfd/patterns/PatternRow';
import TableProps from '@/components/tfd/patterns/TableProps';
import {
  blueprintSet,
  descendantParts,
  enhanceFilters,
  hardPatterns,
  missionOptions,
  missionTypes,
  normalPatterns,
  weaponParts,
} from '@/components/tfd/patterns/types';
import {
  createFilterFromSet,
  extractAndAddToSet,
  filterAndSortPatterns,
  getAttribute,
  getRounds,
  isEnhance,
} from '@/components/tfd/patterns/utils';
import { createFilterMap } from '@/utils/utils';

interface WishlistProps {
  missionFilterMap: MissionFilterMap;
  itemFilterMap: BlueprintFilterMap;
  descendantOptions: FilterOptionsData[];
  weaponOptions: FilterOptionsData[];
  enhanceOptions: FilterOptionsData[];
  normalPatternData: Pattern[];
  hardPatternData: Pattern[];
  seo: NextSeoProps;
}

const Wishlist: FC<WishlistProps> = ({
  missionFilterMap,
  itemFilterMap,
  descendantOptions,
  weaponOptions,
  enhanceOptions,
  normalPatternData,
  hardPatternData,
  seo,
}) => {
  const [isComponent, setComponent] = useState('set-wishlist');
  const [missionFilter, setMissionFilter] = useState(missionFilterMap);
  const [itemFilter, setItemFilter] = useState(itemFilterMap);
  const [filteredNormals, setfilteredNormals] = useState(normalPatternData);
  const [filteredHards, setfilteredHards] = useState(hardPatternData);

  const isWishlist = isComponent === 'set-wishlist';
  const isFilter = isComponent === 'view-wishlist';
  const isPattern = isComponent === 'patterns';

  useEffect(() => {
    const normalFilter = filterAndSortPatterns(normalPatternData, itemFilter, missionFilter);
    const hardFilter = filterAndSortPatterns(hardPatternData, itemFilter, missionFilter);
    setfilteredNormals(normalFilter);
    setfilteredHards(hardFilter);
  }, [itemFilter, missionFilter]);

  return (
    <>
      <Header seo={seo} />
      <Container>
        <div className="flex w-full flex-col justify-center gap-2 self-center md:w-min md:flex-row">
          <Button onClick={() => setComponent('set-wishlist')} disabled={isWishlist}>
            Set Wishlist
          </Button>
          <Button onClick={() => setComponent('view-wishlist')} disabled={isFilter}>
            View Wishlist
          </Button>
          <Button onClick={() => setComponent('patterns')} disabled={isPattern}>
            All Patterns
          </Button>
        </div>
      </Container>
      <Container className={!isWishlist ? 'hidden' : undefined}>
        <div className="pattern-data flex flex-row flex-wrap gap-2 md:gap-3 xl:gap-5">
          <FilterOptions filterOptions={descendantOptions} filter={itemFilter} setFilter={setItemFilter} />
          <FilterOptions filterOptions={weaponOptions} filter={itemFilter} setFilter={setItemFilter} />
          <FilterOptions filterOptions={enhanceOptions} filter={itemFilter} setFilter={setItemFilter} />
        </div>
      </Container>
      {(isFilter || isPattern) && (
        <>
          <Container>
            <div>
              <FilterOptions
                filterOptions={missionOptions}
                filter={missionFilter}
                setFilter={setMissionFilter}
                checkboxContainerClasses="grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row"
              />
            </div>
          </Container>
          <Container>
            <Table
              body={(isFilter ? filteredNormals : normalPatternData).map(data => (
                <PatternRow key={data.pattern + data.variant} data={data} />
              ))}
              {...TableProps['normal']}
            />
          </Container>
          <Container>
            <Table
              body={(isFilter ? filteredHards : hardPatternData).map(data => (
                <PatternRow key={data.pattern + data.variant} data={data} />
              ))}
              {...TableProps['hard']}
            />
          </Container>
        </>
      )}
      <Container className="flex grow flex-col" />
      <Footer />
    </>
  );
};

export const getStaticProps = (async () => {
  const descendants = new Set<string>();
  const weapons = new Set<string>();
  const itemFilterMap = {} as BlueprintFilterMap;

  const missionFilterMap = createFilterMap(missionTypes) as MissionFilterMap;

  blueprintSet.forEach(blueprint => {
    itemFilterMap[blueprint] = false;

    if (isEnhance(blueprint)) {
      return;
    }

    if (extractAndAddToSet(blueprint, descendantParts, descendants)) {
      extractAndAddToSet(blueprint, weaponParts, weapons);
    }
  });

  const title = 'The First Descendant (TFD) Pattern/Wishlist Tool';
  const description = `Tool for filtering or wishlisting blueprints in The First Descedant (TFD). 
    Filters patterns based on selected blueprints and mission type. 
    Contains all patterns and pattern data.`;

  return {
    props: {
      itemFilterMap,
      missionFilterMap,
      descendantOptions: createFilterFromSet(descendants, descendantParts, getAttribute),
      weaponOptions: createFilterFromSet(weapons, weaponParts, getRounds),
      enhanceOptions: enhanceFilters,
      normalPatternData: normalPatterns,
      hardPatternData: hardPatterns,
      seo: {
        title,
        description,
        openGraph: {
          url: 'https://ortillo.cam/tfd/wishlist',
          title,
          description,
          images: [{ url: 'https://ortillo.cam/logo-512x512.png' }],
        },
      },
    },
  };
}) satisfies GetStaticProps;

export default Wishlist;
