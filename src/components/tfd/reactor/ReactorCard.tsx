import Image from 'next/image';

import { reactorAttributes, type ReactorAttributesType } from '@/components/tfd/reactor/types';
import type { FC } from 'react';

import { getLabelClass } from '@/utils/utils';

interface ReactorCardProps {
  reactor_name: string;
  image_url: string;
}

const ReactorCard: FC<ReactorCardProps> = ({ reactor_name, image_url }) => (
  <div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg border-2 border-white bg-slate-900 pb-2 text-center shadow-md shadow-black">
    <div className="reactor-image bg-mixed relative">
      <Image
        src={image_url}
        fill={true}
        alt={reactor_name}
        sizes="350px"
        loading="lazy"
        className="overflow-hidden rounded-t-lg border-4 border-black object-contain"
      />
    </div>
    <div
      className={[
        'flex flex-col whitespace-pre-wrap border-white px-4 text-lg lg:text-xl',
        getLabelClass(reactorAttributes[reactor_name.split(' ')[0] as ReactorAttributesType].type),
      ]
        .filter(string => string)
        .join(' ')}
    >
      {reactor_name.split(' ').join('\n')}
    </div>
  </div>
);

export default ReactorCard;
