import Image from 'next/image';
import Link from 'next/link';

import type { FormattedDescendantData } from '@/components/tfd/descendants/types';
import type { FC } from 'react';

import Icon from '@/components/icon/Icon';
import { attributesImages } from '@/utils/attributes/types';
import { getLabelClass, kebabCase } from '@/utils/utils';

const DescendantCard: FC<FormattedDescendantData> = ({
  descendant_name,
  descendant_image_url,
  descendant_stat,
  is_ultimate,
  attribute,
}) => {
  const name = is_ultimate ? `Ultimate ${descendant_name}` : descendant_name;
  const stats = descendant_stat.stat_detail.map(({ stat_type, stat_value }) => (
    <div key={stat_type} className="descendant-card-stats border-t-2 border-white odd:bg-slate-700 even:bg-slate-800">
      <span className="border-r-1 border-white py-2 pl-4 pr-2 font-bold">{stat_type}</span>
      <span className="border-l-1 border-white py-2 pl-2 pr-4">{stat_value}</span>
    </div>
  ));
  const labelClass = getLabelClass(attribute);
  const ultimateClass = is_ultimate && 'label-ultimate';
  const imageBackground = is_ultimate ? 'bg-ultimate' : 'bg-standard';

  return (
    <Link
      href={`/descendants/${kebabCase(name)}`}
      className="input-hover flex w-full flex-col overflow-hidden rounded-lg border-2 border-white bg-slate-800 shadow-lg shadow-black"
    >
      <div className="flex flex-row">
        <div className={['descendant-image relative border-r-2 border-white', imageBackground].join(' ')}>
          <Image src={descendant_image_url} fill={true} alt={name} />
        </div>
        <div className={['flex flex-col justify-center p-4 text-xl lg:text-2xl gap-2', labelClass].join(' ')}>
          <span className={['font-bold', ultimateClass].join(' ')}>{name}</span>
          <div className="flex flex-row items-center gap-2">
            {' '}
            <Icon src={attributesImages[attribute].attribute} alt={attribute} /> {attribute}
          </div>
        </div>
      </div>
      <div className="flex flex-col">{stats}</div>
    </Link>
  );
};

export default DescendantCard;
