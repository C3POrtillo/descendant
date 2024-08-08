import Image from 'next/image';

import type { RoundsType, WeaponType } from '@/components/tfd/weapon/types';
import type { TiersType } from '@/utils/types';
import type { FC } from 'react';

import Icon from '@/components/icon/Icon';
import { roundsImages } from '@/components/tfd/weapon/types';
import { getBackgroundClass, getLabelClass } from '@/utils/utils';

interface WeaponCardProps {
  weapon_name: string;
  weapon_tier: TiersType;
  weapon_type: WeaponType;
  weapon_rounds_type: RoundsType;
  image_url: string;
}

const WeaponCard: FC<WeaponCardProps> = ({ weapon_name, weapon_tier, weapon_type, weapon_rounds_type, image_url }) => (
  <div className="flex flex-col gap-2 overflow-hidden rounded-lg border-2 border-black bg-slate-800 pb-2 text-center text-lg shadow-md shadow-black 2xl:text-2xl">
    <div className={['weapon-image relative', getBackgroundClass(weapon_tier)].join(' ')}>
      <Image
        src={image_url}
        fill={true}
        alt={weapon_name}
        sizes="350px"
        loading="lazy"
        className="border-b-2 border-black object-contain"
      />
    </div>
    <div className="px-2">
      <div className={getLabelClass(weapon_tier)}>{weapon_name}</div>
      <div className={getLabelClass(weapon_rounds_type)}>
        <div className="flex flex-row items-center justify-center gap-2">
          {<Icon src={roundsImages[weapon_rounds_type]} alt={weapon_rounds_type} backgroundClass="diamond" />}
          {weapon_type}
        </div>
      </div>
    </div>
  </div>
);

export default WeaponCard;
