import { type FC, useEffect, useState } from 'react';

import type { FilterOptionsData } from '@/components/inputs/types';
import type { BlueprintFilterMap, HardPattern, NormalPattern } from '@/components/patterns/types';

import Container from '@/components/container/Container';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';
import Button from '@/components/inputs/Button/Button';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import PatternHeaders from '@/components/patterns/PatternHeaders';
import PatternRow from '@/components/patterns/PatternRow';
import {
  blueprintSet,
  descendantParts,
  enhance,
  enhanceFilters,
  hardPatterns,
  normalPatterns,
  weaponParts,
} from '@/components/patterns/types';
import { getAttribute, getRounds } from '@/components/patterns/utils';
import Table from '@/components/table/Table';

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
  const [isWishlist, setIsWishlist] = useState(true);
  const [filter, setFilter] = useState(filterMap);
  const [filteredNormals, setfilteredNormals] = useState(normalPatternData);
  const [filteredHards, setfilteredHards] = useState(hardPatternData);

  useEffect(() => {
    

  }, [filter]);

  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-row gap-2">
          <Button onClick={() => setIsWishlist(true)}>Wishlist</Button>
          <Button onClick={() => setIsWishlist(false)}>Patterns</Button>
        </div>
      </Container>
      <Container className={['pattern-data flex flex-row flex-wrap', isWishlist ? '' : 'hidden'].join(' ')}>
        <FilterOptions filterOptions={descendantOptions} filter={filter} setFilter={setFilter} />
        <FilterOptions filterOptions={weaponOptions} filter={filter} setFilter={setFilter} />
        <FilterOptions filterOptions={enhanceOptions} filter={filter} setFilter={setFilter} />
      </Container>
      <Container
        className={['pattern-data subregion-data flex flex-col justify-center gap-4', isWishlist ? 'hidden' : ''].join(
          ' ',
        )}
      >
        <Table
          label="Normal"
          headers={PatternHeaders('normal')}
          body={filteredNormals.map(data => (
            <PatternRow key={data.pattern + data.variant} data={data} />
          ))}
          isSticky={true}
        />
        <Table
          label="Hard"
          headers={PatternHeaders('hard')}
          body={filteredHards.map(data => (
            <PatternRow key={data.pattern + data.variant} data={data} />
          ))}
          isSticky={true}
        />
      </Container>

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
    if (enhance.some(item => blueprint.includes(item))) {
      return;
    }

    const isDescendant = !descendantParts.every(part => {
      if (blueprint.includes(part)) {
        descendants.add(blueprint.split(part)[0].trim());

        return false;
      }

      return true;
    });

    if (isDescendant) {
      return;
    }

    weaponParts.every(part => {
      if (blueprint.includes(part)) {
        weapons.add(blueprint.split(part)[0].trim());

        return false;
      }

      return true;
    });
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
