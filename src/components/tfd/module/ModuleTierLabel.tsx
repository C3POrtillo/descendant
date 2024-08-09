import type { ModuleTiersType } from '@/components/tfd/module/types';
import type { FC } from 'react';

import { getBackgroundClass } from '@/utils/utils';

interface ModuleTierLabelProps {
  label: ModuleTiersType;
}

const ModuleTierLabel: FC<ModuleTierLabelProps> = ({ label }) => {
  const backgroundClass = getBackgroundClass(label);

  return (
    <span
      className={[
        'm-1 w-32 rounded-md border-1 border-black text-center text-base shadow-md shadow-black xl:text-lg',
        backgroundClass,
      ].join(' ')}
    >
      {label}
    </span>
  );
};

export default ModuleTierLabel;
