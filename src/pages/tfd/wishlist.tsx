import { type FC, useEffect, useState } from 'react';

import type { FilterOptionsData } from '@/components/inputs/types';
import type { HardPattern, NormalPattern } from '@/components/patterns/types';

import Container from '@/components/container/Container';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';
import Button from '@/components/inputs/Button/Button';
import FilterOptions from '@/components/inputs/Checkbox/FilterOptions';
import PatternHeaders from '@/components/patterns/PatternHeaders';
import PatternRow from '@/components/patterns/PatternRow';
import { descendantParts, enhance, enhanceFilters, hardPatterns, normalPatterns, weaponParts } from '@/components/patterns/types';
import Table from '@/components/table/Table';
import { kebabCase, sortData } from '@/utils/utils';

interface WishlistProps {
  descendantOptions: FilterOptionsData[];
  weaponOptions: FilterOptionsData[];
  enhanceOptions: FilterOptionsData[];
  normalPatternData: NormalPattern[];
  hardPatternData: HardPattern[];
}

const Wishlist: FC<WishlistProps> = ({ descendantOptions, weaponOptions, enhanceOptions, normalPatternData, hardPatternData }) => {
  const [isWishlist, setIsWishlist] = useState(true);
  const [filteredNormals, setfilteredNormals] = useState(normalPatternData);
  const [filteredHards, setfilteredHards] = useState(hardPatternData);

  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-row gap-2">
          <Button onClick={() => setIsWishlist(true)}>Wishlist</Button>
          <Button onClick={() => setIsWishlist(false)}>Patterns</Button>
        </div>
      </Container>
      {isWishlist && (
        <>
          <Container className="flex flex-row flex-wrap">
            <FilterOptions filterOptions={descendantOptions}/>
            <FilterOptions filterOptions={weaponOptions}/>
            <FilterOptions filterOptions={enhanceOptions}/>
          </Container>
        </>
      )}
      {!isWishlist && (
        <>
          <Container>
            <Table
              label="Normal"
              headers={PatternHeaders('normal')}
              body={filteredNormals.map(data => (
                <PatternRow key={data.pattern + data.variant} data={data} />
              ))}
              className="pattern-data subregion-data"
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
              className="pattern-data subregion-data"
              isSticky={true}
            />
          </Container>
        </>
      )}
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const descendants = new Set<string>();
  const weapons = new Set<string>();

  const blueprints = new Set(
    [
      ...normalPatterns.flatMap(pattern => [...pattern['38%'], pattern['15%'], pattern['6%'], pattern['3%']]),
      ...hardPatterns.flatMap(pattern => [...pattern['32%'], pattern['20%'], pattern['10%'], pattern['6%']]),
    ].sort(sortData),
  );

  blueprints.forEach(blueprint => {
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
    name: kebabCase(descendant),
    data: descendantParts.map(part => ({
      value: part,
    })),
    defaultChecked: false,
  })) as FilterOptionsData[];

  const weaponFilters = Array.from(weapons).map((weapon: string) => ({
    label: weapon,
    name: kebabCase(weapon),
    data: weaponParts.map(part => ({
      value: part,
    })),
    defaultChecked: false,
  })) as FilterOptionsData[];


  return {
    props: {
      descendantOptions: descendantFilters,
      weaponOptions: weaponFilters,
      enhanceOptions: enhanceFilters,
      normalPatternData: normalPatterns,
      hardPatternData: hardPatterns,
    },
  };
};

export default Wishlist;
