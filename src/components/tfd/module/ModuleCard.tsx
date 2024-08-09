import Image from 'next/image';
import { useState } from 'react';

import type { ModuleAPIData } from '@/components/tfd/module/types';
import type { FC } from 'react';

import Icon from '@/components/icon/Icon';
import ModuleLevel from '@/components/tfd/module/ModuleLevel';
import { classImages, socketImages } from '@/components/tfd/module/types';
import { getBackgroundClass, getLabelClass } from '@/utils/utils';

const ModuleCard: FC<ModuleAPIData> = ({
  module_name,
  image_url,
  module_type,
  module_tier,
  module_socket_type,
  module_class,
  module_stat,
}) => {
  const [level, setLevel] = useState(0);
  const labelClass = getLabelClass(module_tier);
  const imageBackground = getBackgroundClass(module_tier);
  const { module_capacity, value } = module_stat[level];

  return (
    <div className="min-w-80 max-w-80">
      <div className="relative flex justify-center">
        <div className="absolute -top-4 z-10 flex flex-row items-center gap-2 rounded-md border-2 border-black bg-slate-900 px-2 py-1">
          <Icon src={socketImages[module_socket_type]} alt={module_socket_type} size="6" />
          <span>{module_capacity}</span>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-slate-800 shadow-lg shadow-black">
        <div className="relative flex w-full gap-1 pb-2 pl-2 pr-10 pt-4">
          <ModuleLevel currentLevel={level} maxLevel={module_stat.length} setLevel={setLevel} />
          <div
            className={[
              'module-image relative size-24 rounded-md border-2 border-black shadow-md shadow-black',
              imageBackground,
            ].join(' ')}
          >
            <Image src={image_url} fill={true} alt={module_name} />
          </div>
          <div className="flex w-full pl-1">
            <h3 className={['text-wrap text-lg font-bold', labelClass].join(' ')}>{module_name}</h3>
          </div>
          <div className="absolute right-1 top-1">
            <Icon src={classImages[module_class]} alt={module_class} backgroundClass="diamond" />
          </div>
        </div>
        <div className="scroll-bar max-h-52 min-h-52 overflow-auto text-wrap px-4 pb-2">
          <p>{value}</p>
        </div>
        <div className="min-h-8 w-full bg-slate-900 py-1 text-center">{module_type}</div>
      </div>
    </div>
  );
};

export default ModuleCard;
