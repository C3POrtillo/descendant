import Image from 'next/image';

import type { FC } from 'react';

export interface IconProps {
  src?: string;
  alt?: string;
  backgroundClass?: 'diamond' | 'hexagon' | 'rounded-square';
  size?: 'size-8' | 'size-10';
}

const Icon: FC<IconProps> = ({ src, alt, backgroundClass, size = 'size-8' }) =>
  src && (
    <div className={['relative flex flex-wrap', size].join(' ')}>
      {backgroundClass && <div className={backgroundClass} />}
      <Image fill={true} sizes="100%" src={src} alt={alt || ''} quality={100} />
    </div>
  );

export default Icon;
