import Image from 'next/image';

import type { FormattedExternalComponentData } from '@/components/tfd/externalComponents/types';
import type { BaseStat, TiersType } from '@/utils/types';
import type { FC } from 'react';

import { getBackgroundLinear, getLabelClass } from '@/utils/utils';

interface ExternalComponentCardProps extends Partial<FormattedExternalComponentData> {
  external_component_name: string;
  image_url: string;
  external_component_tier: TiersType;
  stat: BaseStat;
}

const ExternalComponentCard: FC<ExternalComponentCardProps> = ({
  external_component_name,
  image_url,
  external_component_tier,
  stat,
  set_option_detail,
}) => (
  <div className="external-component-data flex max-h-min w-full flex-col overflow-hidden rounded-lg border-2 border-black bg-slate-900 shadow-lg shadow-black">
    <div
      className={[
        'flex flex-col justify-between border-b-2 border-black p-2 text-xl',
        getLabelClass(external_component_tier),
      ].join(' ')}
    >
      <div className="flex flex-row gap-2">
        <div
          className={[
            'external-component-image relative overflow-hidden rounded-md border-2 border-black shadow-md shadow-black',
            getBackgroundLinear(external_component_tier),
          ].join(' ')}
        >
          <Image
            src={image_url}
            fill={true}
            alt={external_component_name}
            sizes="350px"
            loading="lazy"
            className="overflow-hidden object-contain"
          />
        </div>
        <div className="flex size-full flex-col justify-between">
          {external_component_name}
          <span>
            {stat.stat_id} {stat.stat_value}
          </span>
        </div>
      </div>
    </div>
    {!!set_option_detail?.length && (
      <div className="h-full bg-slate-800 py-2 text-left text-lg text-white lg:text-xl">
        {set_option_detail.map(({ set_count, set_option_effect }) => (
          <div key={set_count}>
            <div className="pl-2">Set Count: {set_count}</div>
            <div className="pl-4 font-semibold">{set_option_effect}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ExternalComponentCard;
