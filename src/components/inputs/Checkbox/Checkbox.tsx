import type { IconProps } from '@/components/icon/Icon';
import type { FilterMap, FilterTypes } from '@/components/inputs/types';
import type { FC, InputHTMLAttributes } from 'react';

import Icon from '@/components/icon/Icon';
import { createWeaponLabel } from '@/components/weapon/utils';
import { createLabelClass, kebabCase } from '@/utils/utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  name?: string;
  defaultChecked?: boolean;
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
  icon?: IconProps;
}

const Checkbox: FC<CheckboxProps> = ({ label, value, name, defaultChecked, filter, setFilter, icon }) => {
  const id = `${label.toLowerCase()}-${kebabCase(value)}`;

  return (
    <label
      htmlFor={id}
      className={[
        'flex flex-row gap-2 rounded-md p-2 text-base hover:bg-slate-400 md:text-xl lg:text-3xl 2xl:text-2xl',
        name ? createLabelClass(name, name === 'weapon-type' ? createWeaponLabel(value) : value) : '',
      ].join(' ')}
    >
      <input
        type="checkbox"
        className="size-5 self-center rounded border-gray-600 bg-gray-700 text-2xl ring-offset-gray-800 focus:ring-2 focus:ring-blue-600"
        id={id}
        name={value}
        defaultChecked={defaultChecked}
        onChange={e => {
          if (filter && setFilter) {
            filter[value as FilterTypes] = e.target.checked;
            setFilter({ ...filter });
          }
        }}
      />
      <div className="flex flex-row items-center justify-center gap-1 xl:gap-2">
        {icon?.src && <Icon {...icon} />}
        {value}
      </div>
    </label>
  );
};

export default Checkbox;
