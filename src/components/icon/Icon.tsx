import Image from 'next/image';

import type { FC } from 'react';

export interface IconProps {
  src?: string;
  alt?: string;
  backgroundClass?: 'diamond' | 'hexagon' | 'rounded-square';
  size?: '8' | '10';
}

const Icon: FC<IconProps> = ({ src, alt, backgroundClass, size = '8' }) => {
  const getSize = () => `size-${size} `
    
  return src && (
    <div className={['relative flex flex-wrap min-w-8 min-h-8', getSize()].join(' ')}>
      {backgroundClass && <div className={backgroundClass} />}
      <Image fill={true} sizes="100%" src={src} alt={alt || ''} quality={100} loading="lazy" />
    </div>
  )};

export default Icon;
