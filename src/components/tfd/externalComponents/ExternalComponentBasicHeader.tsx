import Image from 'next/image';

import type { BasicDataType } from '@/components/tfd/externalComponents/types';
import type { FC } from 'react';

import { mainStats } from '@/components/tfd/externalComponents/types';

interface ExternalComponentBasicHeaderProps extends BasicDataType {
  component: string;
}

const labels = ['label-standard', 'label-rare', 'label-ultimate'];

const ExternalComponentBasicHeader: FC<ExternalComponentBasicHeaderProps> = ({
  component,
  image_url,
  Standard,
  Rare,
  Ultimate,
}) => (
  <th className="external-component-data flex w-full flex-col border-b-2 border-white text-center">
    <div className="external-component-image relative">
      <Image src={image_url} fill={true} alt={component} sizes="128px" loading="lazy" className="object-contain" />
    </div>
    <div className="mt-2 flex flex-row gap-0.5 border-y-2 border-white bg-white">
      {mainStats.map(stat => (
        <div key={stat} className="w-1/3 bg-slate-800 p-2 text-xl">
          {stat}
        </div>
      ))}
    </div>
    {[Standard, Rare, Ultimate].map(
      (array, index) =>
        array && (
          <div className={['flex flex-row gap-0.5 bg-white', labels[index]].join(' ')} key={labels[index]}>
            {array.map(({ stat_value }) => (
              <div key={stat_value} className="w-1/3 bg-slate-800 px-2 py-0.5 text-xl">
                {stat_value}
              </div>
            ))}
          </div>
        ),
    )}
  </th>
);

export default ExternalComponentBasicHeader;
