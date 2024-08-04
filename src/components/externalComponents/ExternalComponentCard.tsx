import Image from 'next/image';

import type { ExternalComponentStatType, FormattedExternalComponentData } from '@/components/externalComponents/types';
import type { TiersType } from '@/utils/types';
import type { FC } from 'react';

import { getBackgroundClass, getLabelClass } from '@/utils/utils';

interface ExternalComponentCardProps extends Partial<FormattedExternalComponentData> {
  external_component_name: string;
  image_url: string;
  external_component_tier: TiersType;
  stat: ExternalComponentStatType;
}

const ExternalComponentCard: FC<ExternalComponentCardProps> = ({
  external_component_name,
  image_url,
  external_component_tier,
  stat,
  set_option_detail,
}) => (
  <div className="external-component-data flex max-h-min w-full flex-col gap-2 overflow-hidden rounded-lg  border-2 border-white bg-slate-900 pb-2 text-center shadow-md shadow-black">
    <div
      className={['external-component-image relative ', getBackgroundClass(external_component_tier)]
        .filter(string => string)
        .join(' ')}
    >
      <Image
        src={image_url}
        fill={true}
        alt={external_component_name}
        sizes="350px"
        loading="lazy"
        className="overflow-hidden rounded-t-lg border-4 border-black object-contain"
      />
    </div>
    <div
      className={[
        'mx-2 flex flex-col border-white text-sm md:text-base lg:text-xl',
        getLabelClass(external_component_tier),
      ]
        .filter(string => string)
        .join(' ')}
    >
      <div className="flex w-full flex-row justify-center gap-1 text-left">
        <p className="flex h-full w-3/4 flex-col justify-center self-center border-r-2 border-solid border-white pl-2 pr-3">
          {external_component_name}
        </p>
        <p className="w-1/4 pl-3 pr-2 text-right">
          {stat.stat_id}
          <br />
          {stat.stat_value}
        </p>
      </div>
      {!!set_option_detail?.length && (
        <div className="mt-2 border-t-2 border-white pt-2 text-left text-white">
          {set_option_detail.map(({ set_count, set_option_effect }) => (
            <div key={set_count}>
              <div className="pl-2">Set Count: {set_count}</div>
              <div className="pl-4 font-semibold">{set_option_effect}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default ExternalComponentCard;
