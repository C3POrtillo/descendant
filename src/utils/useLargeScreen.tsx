import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const use2xlScreen = () => {
  const [largeScreen, setlargeScreen] = useState(true);
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1536px)' });

  useEffect(() => {
    setlargeScreen(isLargeScreen);
  }, []);

  useEffect(() => {
    setlargeScreen(isLargeScreen);
  }, [isLargeScreen]);

  return largeScreen;
};

export default use2xlScreen;
