import { type FC, useState } from 'react';

import type { DirectionValues } from '@/components/inputs/types';
import type { HardPattern, NormalPattern } from '@/components/patterns/types';

import Container from '@/components/container/Container';
import Footer from '@/components/footer/TFD/Footer';
import Header from '@/components/header/TFD/Header';
import PatternHeaders from '@/components/patterns/PatternHeaders';
import PatternRow from '@/components/patterns/PatternRow';
import { hardPatterns, normalPatterns } from '@/components/patterns/types';
import Table from '@/components/table/Table';
import Button from '@/components/inputs/Button/Button';

interface WishlistProps {
  normalPatternData: NormalPattern[];
  hardPatternData: HardPattern[];
}

const Wishlist: FC<WishlistProps> = ({ normalPatternData, hardPatternData }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const [filteredNormals, setfilteredNormals] = useState(normalPatternData);
  const [sortNormalDirection, setSortNormalDirection] = useState(0 as DirectionValues);
  const [sortNormalColumn, setSortNormalColumn] = useState('');
  const [filteredHards, setfilteredHards] = useState(hardPatternData);
  const [sortHardDirection, setSortHardDirection] = useState(0 as DirectionValues);
  const [sortHardColumn, setSortHardColumn] = useState('');

  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-row gap-2">
          <Button className="tfd-link button" onClick={() => setIsWishlist(true)}>
            Wishlist
          </Button>
          <Button className="tfd-link button" onClick={() => setIsWishlist(false)}>
            Patterns
          </Button>
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
              sortDirection={sortNormalDirection}
              sortColumn={sortNormalColumn}
              setSortDirection={setSortNormalDirection}
              setSortColumn={setSortNormalColumn}
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
              sortDirection={sortHardDirection}
              sortColumn={sortHardColumn}
              setSortDirection={setSortHardDirection}
              setSortColumn={setSortHardColumn}
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
