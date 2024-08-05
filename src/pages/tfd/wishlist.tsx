import { type FC, useEffect, useState } from 'react';

import type { FilterOptionsData } from '@/components/inputs/types';
import type { BlueprintFilterMap, MissionFilterMap, Pattern } from '@/components/tfd/patterns/types';

import Container from '@/components/container/Container';
import Button from '@/components/inputs/Button/Button';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import Table from '@/components/table/Table';
import Footer from '@/components/tfd/footer/Footer';
import Header from '@/components/tfd/header/Header';
import PatternHeaders from '@/components/tfd/patterns/PatternHeaders';
import PatternRow from '@/components/tfd/patterns/PatternRow';
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
  missionFilterMap: BlueprintFilterMap;
  itemFilterMap: BlueprintFilterMap;
  descendantOptions: FilterOptionsData[];
  weaponOptions: FilterOptionsData[];
  enhanceOptions: FilterOptionsData[];
  normalPatternData: Pattern[];
  hardPatternData: Pattern[];
}

const Wishlist: FC<WishlistProps> = ({
  missionFilterMap,
  itemFilterMap,
  descendantOptions,
  weaponOptions,
  enhanceOptions,
  normalPatternData,
  hardPatternData,
}) => {
  const [isComponent, setIsComponent] = useState('set-wishlist');
  const [missionFilter, setMissionFilter] = useState(missionFilterMap);
  const [itemFilter, setItemFilter] = useState(itemFilterMap);
  const [filteredNormals, setfilteredNormals] = useState(normalPatternData);
  const [filteredHards, setfilteredHards] = useState(hardPatternData);

  const isWishlist = isComponent === 'set-wishlist';
  const isFilter = isComponent === 'view-wishlist';
  const isPattern = isComponent === 'patterns';

  useEffect(() => {
    console.log(missionFilter);
    const normalFilter = filterAndSortPatterns(normalPatternData, itemFilter);
    const hardFilter = filterAndSortPatterns(hardPatternData, itemFilter);
    setfilteredNormals(normalFilter);
    setfilteredHards(hardFilter);
  }, [itemFilter, missionFilter]);

  const commonProps = {
    className: 'pattern-data',
    isSticky: true,
  } as const;

  const normalProps = {
    label: 'Normal',
    headers: PatternHeaders('normal'),
    ...commonProps,
  } as const;

  const hardProps = {
    label: 'Hard',
    headers: PatternHeaders('hard'),
    sublabel: <p className="pb-2 text-center text-xl text-yellow-200">Patterns marked with * are stealth only</p>,
    ...commonProps,
  } as const;

  return (
    <>
      <Header />
      <Container className="mb-0">
        <div className="flex w-min flex-row flex-wrap gap-2 self-center md:flex-nowrap">
          <Button onClick={() => setIsComponent('set-wishlist')} disabled={isWishlist}>
            Set Wishlist
          </Button>
          <Button onClick={() => setIsComponent('view-wishlist')} disabled={isFilter}>
            View Wishlist
          </Button>
          <Button onClick={() => setIsComponent('patterns')} disabled={isPattern}>
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
          <Container className="mb-0">
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
              {...normalProps}
            />
          </Container>
          <Container>
            <Table
              body={(isFilter ? filteredHards : hardPatternData).map(data => (
                <PatternRow key={data.pattern + data.variant} data={data} />
              ))}
              {...hardProps}
            />
          </Container>
        </>
      )}
      <Container className="m-0 flex grow flex-col" />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const descendants = new Set<string>();
  const weapons = new Set<string>();
  const itemFilterMap = {} as BlueprintFilterMap;

  const missionFilterMap = createFilterMap(missionTypes) as MissionFilterMap;

  blueprintSet.forEach(blueprint => {
    itemFilterMap[blueprint] = false;

    if (isEnhance(blueprint)) {
      return;
    }

    extractAndAddToSet(blueprint, descendantParts, descendants) || extractAndAddToSet(blueprint, weaponParts, weapons);
  });

  return {
    props: {
      itemFilterMap,
      missionFilterMap,
      descendantOptions: createFilterFromSet(descendants, descendantParts, getAttribute),
      weaponOptions: createFilterFromSet(weapons, weaponParts, getRounds),
      enhanceOptions: enhanceFilters,
      normalPatternData: normalPatterns,
      hardPatternData: hardPatterns,
    },
  };
};

export default Wishlist;
