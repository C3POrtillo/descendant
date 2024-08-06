import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const use2xlScreen = () => {
  const [xxlScreen, setxxlScreen] = useState(true);
  const isXxlScreen = useMediaQuery({ query: '(min-width: 1536px)' });

  useEffect(() => {
    setxxlScreen(isXxlScreen);
  }, []);

  useEffect(() => {
    setxxlScreen(isXxlScreen);
  }, [isXxlScreen]);

  return xxlScreen;
};

export default use2xlScreen;
