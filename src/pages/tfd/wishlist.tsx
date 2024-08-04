import { type FC, useEffect, useState } from 'react';

import type { HardPattern, NormalPattern } from '@/components/patterns/types';

import Container from '@/components/container/Container';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';
import Button from '@/components/inputs/Button/Button';
import PatternHeaders from '@/components/patterns/PatternHeaders';
import PatternRow from '@/components/patterns/PatternRow';
import { hardPatterns, normalPatterns } from '@/components/patterns/types';
import Table from '@/components/table/Table';

interface WishlistProps {
  normalPatternData: NormalPattern[];
  hardPatternData: HardPattern[];
}

const Wishlist: FC<WishlistProps> = ({ normalPatternData, hardPatternData }) => {
  const [isWishlist, setIsWishlist] = useState(false);
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
          <Container>TEMP DATA</Container>
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
  const temp = '';

  return {
    props: {
      normalPatternData: normalPatterns,
      hardPatternData: hardPatterns,
    },
  };
};

export default Wishlist;
