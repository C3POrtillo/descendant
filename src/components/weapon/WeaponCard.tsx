import Image from 'next/image';

import type { FC } from 'react';

import Icon from '@/components/icon/Icon';
import { createLabelClass } from '@/components/inputs/utils';
import { type RoundsType, type TiersType, type WeaponType, roundsImages } from '@/components/weapon/types';
import { getBackgroundClass } from '@/components/weapon/utils';


interface WeaponCardProps {
  weapon_name: string;
  weapon_tier: TiersType;
  weapon_type: WeaponType;
  weapon_rounds_type: RoundsType;
  image_url: string;
}

const WeaponCard: FC<WeaponCardProps> = ({ weapon_name, weapon_tier, weapon_type, weapon_rounds_type, image_url }) => (
  <div className="flex flex-col gap-2 rounded border-2 border-black bg-slate-800 pb-2 text-center text-2xl shadow-sm shadow-black">
    <div className={['weapon-image relative', getBackgroundClass(weapon_tier)].join(' ')}>
      <Image
        src={image_url}
        fill={true}
        alt={weapon_name}
        sizes="350px"
        loading="lazy"
        className="border-b-2 border-b-black object-contain"
      />
    </div>
    <div>
      <div className={createLabelClass(weapon_tier)}>{weapon_name}</div>
      <div className={createLabelClass(weapon_rounds_type)}>
        <div className="flex flex-row items-center justify-center gap-2">
          {<Icon src={roundsImages[weapon_rounds_type]}/>}
          {weapon_type}
        </div>
      </div>
    </div>
  </div>
);

export default WeaponCard;
