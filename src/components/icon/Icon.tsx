import Image from 'next/image';

import type { FC } from 'react';


export interface IconProps {
  src?: string;
  alt?: string;
  backgroundClass?: 'diamond' | 'hexagon' | 'rounded-square';
}

const Icon: FC<IconProps> = ({src, alt, backgroundClass }) => (
  src && 
  <div className="relative flex size-8 flex-wrap"> 
    <div className={backgroundClass}/>
    <Image fill={true} sizes="100%" src={src} alt={alt || ''} quality={100} />
  </div>
)

export default Icon;
