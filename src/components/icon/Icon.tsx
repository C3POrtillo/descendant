import Image from 'next/image';

import type { FC } from 'react';

export interface IconProps {
  src?: string;
  alt?: string;
  backgroundClass?: 'diamond' | 'hexagon' | 'rounded-square' | 'rhombus';
  size?: '6' | '8' | '10';
  className?: string;
}

const Icon: FC<IconProps> = ({ src, alt, backgroundClass, size = '8', className }) => {
  const getSize = () => `size-${size} `;

  return (
    src && (
      <div className={className}>
        <div className={['relative flex min-h-6 min-w-6 flex-wrap', getSize()].join(' ')}>
          {backgroundClass && <div className={backgroundClass} />}
          <Image fill={true} sizes="100%" src={src} alt={alt || ''} quality={100} loading="lazy" />
        </div>
      </div>
    )
  );
};

export default Icon;
