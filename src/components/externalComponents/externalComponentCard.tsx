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
}) => (
  <div className=" external-component-data flex flex-col gap-2 rounded border-2 border-black bg-slate-800 pb-2 text-center text-2xl shadow-sm shadow-black">
    <div className={['external-component-image relative', getBackgroundClass(external_component_tier)].join(' ')}>
      <Image
        src={image_url}
        fill={true}
        alt={external_component_name}
        sizes="350px"
        loading="lazy"
        className="border-b-2 border-b-black object-contain"
      />
    </div>
    <div>
      <div className={getLabelClass(external_component_tier)}>
        {external_component_name}
        <div className="flex flex-row">
          <p>{stat.stat_id}</p>
          <p>{stat.stat_value}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ExternalComponentCard;
