import Image from 'next/image';

import type { RoundsType, TiersType, WeaponType } from '@/components/weapon/types';
import type { FC } from 'react';

import { createLabelClass } from '@/components/inputs/utils';
import { getBackgroundClass } from '@/components/weapon/utils';

interface WeaponCardProps {
  weapon_name: string;
  weapon_tier: TiersType;
  weapon_type: WeaponType;
  weapon_rounds_type: RoundsType;
  image_url: string;
}

const WeaponCard: FC<WeaponCardProps> = ({ weapon_name, weapon_tier, weapon_type, weapon_rounds_type, image_url }) => (
  <div className="flex flex-col gap-2 rounded border-2 border-black bg-slate-800 pb-2 text-center text-lg">
    <div className={`weapon-image relative ${getBackgroundClass(weapon_tier)}`}>
      <Image
        src={image_url}
        fill={true}
        alt="Picture of the author"
        sizes="400px"
        loading="lazy"
        className="border-b-2 border-b-black object-contain"
      />
    </div>
    <div>
      <div className={createLabelClass(weapon_tier)}>
        {weapon_name} ({weapon_type})
      </div>
      <div className={createLabelClass(weapon_rounds_type)}>{weapon_rounds_type}</div>
    </div>
  </div>
);

export default WeaponCard;
