import type { SkillData } from '@/components/tfd/descendants/types';
import type { FC } from 'react';

import Icon from '@/components/icon/Icon';
import { archesImages, attributesImages } from '@/utils/attributes/types';
import { getLabelClass } from '@/utils/utils';

const SkillCard: FC<SkillData> = ({
  skill_name,
  skill_description,
  skill_image_url,
  skill_type,
  arche_type,
  element_type,
}) => {
  const labelClass = getLabelClass(element_type);
  const attribute = (
    <div className={['flex flex-row items-center gap-2', labelClass].join(' ')}>
      <Icon src={attributesImages[element_type].attribute} alt={element_type} /> {element_type}
    </div>
  );
  const arche = (
    <div className="flex flex-row items-center gap-2">
      <Icon src={archesImages[arche_type]} alt={arche_type} /> {arche_type}
    </div>
  );

  return (
    <div className="flex flex-col rounded-md p-2 hover:bg-slate-600">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 text-lg lg:text-xl">
          <Icon src={skill_image_url} alt={skill_name} />
          <span className="text-xl lg:text-2xl">{skill_name}</span>
        </div>
        <span>{skill_type}</span>
      </div>
      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:border-t-1 md:border-white">
        <div className="flex flex-row gap-1 md:flex-col">
          {attribute} {arche}
        </div>
        <p className="text-lg md:border-l-1 md:border-white md:pl-2 md:pt-2">{skill_description}</p>
      </div>
    </div>
  );
};

export default SkillCard;
