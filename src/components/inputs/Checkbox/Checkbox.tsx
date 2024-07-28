import type { IconProps } from '@/components/icon/Icon';
import type { FilterMap, FilterTypes } from '@/components/inputs/types';
import type { FC, InputHTMLAttributes } from 'react';

import Icon from '@/components/icon/Icon';
import { createWeaponLabel } from '@/components/weapon/utils';
import { createLabelClass } from '@/utils/utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  name?: string;
  defaultChecked?: boolean;
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
  icon?: IconProps;
}

const Checkbox: FC<CheckboxProps> = ({ value, name, defaultChecked, filter, setFilter, icon }) => (
  <div key={value} className="text-nowrap">
    <label
      htmlFor={value}
      className={[
        'flex w-full flex-row gap-4 text-2xl',
        name ? createLabelClass(name, name === 'weapon-type' ? createWeaponLabel(value) : value) : '',
      ].join(' ')}
    >
      <input
        type="checkbox"
        className="size-5 self-center rounded"
        id={value}
        name={value}
        defaultChecked={defaultChecked}
        onChange={e => {
          if (filter && setFilter) {
            filter[value as FilterTypes] = e.target.checked;
            setFilter({ ...filter });
          }
        }}
      />
      <div className="flex flex-row items-center justify-center gap-2">
        {icon?.src && <Icon {...icon} />}
        {value}
      </div>
    </label>
  </div>
);

export default Checkbox;
