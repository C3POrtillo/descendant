import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';

const useLargeScreen = () => {
  const [largeScreen, setlargeScreen] = useState(true);
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1536px)' })

  useEffect( () => {
    setlargeScreen(isLargeScreen)
  }, [])

  return largeScreen
};

export default useLargeScreen;
