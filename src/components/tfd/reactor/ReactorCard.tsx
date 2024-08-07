import Image from 'next/image';

import type { FC } from 'react';

import Icon from '@/components/icon/Icon';
import { type ReactorAttributesType, reactorAttributes } from '@/components/tfd/reactor/types';
import { getLabelClass } from '@/utils/utils';

interface ReactorCardProps {
  reactor_name: string;
  image_url: string;
}

const ReactorCard: FC<ReactorCardProps> = ({ reactor_name, image_url }) => {
  const { type, icon } = reactorAttributes[reactor_name.split(' ')[0] as ReactorAttributesType];

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border-2 border-black bg-slate-800 shadow-md shadow-black md:max-w-56">
      <div className="reactor-image bg-rare-ultimate relative">
        <Image
          src={image_url}
          fill={true}
          alt={reactor_name}
          sizes="350px"
          loading="lazy"
          className="overflow-hidden rounded-t-md object-contain"
        />
      </div>
      <div
        className={[
          'flex flex-row items-center gap-4 whitespace-pre-wrap border-t-2 border-black px-4 py-2 text-left text-lg lg:text-xl',
          getLabelClass(type),
        ].join(' ')}
      >
        <Icon src={icon} alt={type} />
        <div>{reactor_name.split(' ').join('\n')}</div>
      </div>
    </div>
  );
};

export default ReactorCard;
