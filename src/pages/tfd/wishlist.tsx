import { type FC, useEffect, useState } from 'react';

import type { FilterOptionsData } from '@/components/inputs/types';
import type { BlueprintFilterMap, HardPattern, NormalPattern } from '@/components/tfd/patterns/types';

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
  normalPatterns,
  weaponParts,
} from '@/components/tfd/patterns/types';
import { extractAndAddToSet, getAttribute, getRounds, isEnhance } from '@/components/tfd/patterns/utils';

interface WishlistProps {
  filterMap: BlueprintFilterMap;
  descendantOptions: FilterOptionsData[];
  weaponOptions: FilterOptionsData[];
  enhanceOptions: FilterOptionsData[];
  normalPatternData: NormalPattern[];
  hardPatternData: HardPattern[];
}

const Wishlist: FC<WishlistProps> = ({
  filterMap,
  descendantOptions,
  weaponOptions,
  enhanceOptions,
  normalPatternData,
  hardPatternData,
}) => {
  const [isComponent, setIsComponent] = useState('set-wishlist');
  const [filter, setFilter] = useState(filterMap);
  const [filteredNormals, setfilteredNormals] = useState(normalPatternData);
  const [filteredHards, setfilteredHards] = useState(hardPatternData);

  const isWishlist = isComponent === 'set-wishlist';
  const isFilter = isComponent === 'view-wishlist';
  const isPattern = isComponent === 'patterns';

  useEffect(() => {
    const normalFilter = normalPatternData.reduce((acc, pattern) => {
      const [common1, common2] = pattern['38%'];
      const uncommon = pattern['15%'];
      const rare = pattern['6%'];
      const rarest = pattern['3%'];
      const validPattern = filter[common1] || filter[common2] || filter[uncommon] || filter[rare] || filter[rarest];

      if (validPattern) {
        acc.push(pattern);
      }

      return acc;
    }, [] as NormalPattern[]);
    setfilteredNormals(normalFilter);

    const hardFilter = hardPatternData.reduce((acc, pattern) => {
      const [common1, common2] = pattern['32%'];
      const uncommon = pattern['20%'];
      const rare = pattern['10%'];
      const rarest = pattern['6%'];
      const validPattern = filter[common1] || filter[common2] || filter[uncommon] || filter[rare] || filter[rarest];

      if (validPattern) {
        acc.push(pattern);
      }

      return acc;
    }, [] as HardPattern[]);
    setfilteredHards(hardFilter);
  }, [filter]);

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
          <FilterOptions filterOptions={descendantOptions} filter={filter} setFilter={setFilter} />
          <FilterOptions filterOptions={weaponOptions} filter={filter} setFilter={setFilter} />
          <FilterOptions filterOptions={enhanceOptions} filter={filter} setFilter={setFilter} />
        </div>
      </Container>
      {isFilter && (
        <>
          <Container>
            <Table
              label="Normal"
              headers={PatternHeaders('normal')}
              body={filteredNormals.map(data => (
                <PatternRow key={data.pattern + data.variant} data={data} />
              ))}
              className="pattern-data"
              isSticky={true}
            />
          </Container>
          <Container>
            <Table
              label="Hard"
              headers={PatternHeaders('hard')}
              body={filteredHards.map(data => (
                <PatternRow key={data.pattern + data.variant} data={data} />
              ))}
              className="pattern-data"
              isSticky={true}
            />
          </Container>
        </>
      )}
      {isPattern && (
        <>
          <Container>
            <Table
              label="Normal"
              headers={PatternHeaders('normal')}
              body={normalPatternData.map(data => (
                <PatternRow key={data.pattern + data.variant} data={data} />
              ))}
              className="pattern-data"
              isSticky={true}
            />
          </Container>
          <Container>
            <Table
              label="Hard"
              headers={PatternHeaders('hard')}
              body={hardPatternData.map(data => (
                <PatternRow key={data.pattern + data.variant} data={data} />
              ))}
              className="pattern-data"
              isSticky={true}
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
  const filterMap = {} as BlueprintFilterMap;

  blueprintSet.forEach(blueprint => {
    filterMap[blueprint] = false;

    if (isEnhance(blueprint)) {
      return;
    }

    if (extractAndAddToSet(blueprint, descendantParts, descendants)) {
      extractAndAddToSet(blueprint, weaponParts, weapons);
    }
  });

  const descendantFilters = Array.from(descendants).map((descendant: string) => ({
    label: descendant,
    name: getAttribute(descendant),
    data: descendantParts.map(part => ({
      value: `${descendant} ${part}`,
      label: part,
    })),
    defaultChecked: false,
  })) as FilterOptionsData[];

  const weaponFilters = Array.from(weapons).map((weapon: string) => ({
    label: weapon,
    name: getRounds(weapon),
    data: weaponParts.map(part => ({
      value: `${weapon} ${part}`,
      label: part,
    })),
    defaultChecked: false,
  })) as FilterOptionsData[];

  return {
    props: {
      filterMap,
      descendantOptions: descendantFilters,
      weaponOptions: weaponFilters,
      enhanceOptions: enhanceFilters,
      normalPatternData: normalPatterns,
      hardPatternData: hardPatterns,
    },
  };
};

export default Wishlist;
