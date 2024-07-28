import type { IconProps } from '@/components/icon/Icon';
import type { FilterMap, FilterTypes } from '@/components/inputs/types';
import type { FC, InputHTMLAttributes } from 'react';

import Icon from '@/components/icon/Icon';
import { getLabelClass } from '@/components/inputs/utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  name?: string;
  defaultChecked?: boolean;
  filter?: FilterMap;
  setState?: React.Dispatch<React.SetStateAction<FilterMap>>;
  icon?: IconProps;
}

const Checkbox: FC<CheckboxProps> = ({ value, name, defaultChecked, filter, setState, icon }) => (
  <div key={value} className="text-nowrap">
    <label htmlFor={value} className={['flex w-full flex-row gap-4 text-2xl', name ? getLabelClass(name, value) : ''].join(' ')}>
      <input
        type="checkbox"
        id={value}
        name={value}
        defaultChecked={defaultChecked}
        onChange={e => {
          if (filter && setState) {
            filter[value as FilterTypes] = e.target.checked;
            setState({ ...filter });
          }
        }}
      />
      <div className="flex flex-row items-center justify-center gap-2">
        {icon?.src && <Icon {...icon}/>}
        {value}
      </div>
    </label>
  </div>
);

export default Checkbox;
