import { useState } from 'react';

import type { IconProps } from '@/components/icon/Icon';
import type { FilterMap, FilterTypes } from '@/components/inputs/types';
import type { FC, InputHTMLAttributes } from 'react';

import Icon from '@/components/icon/Icon';
import { getLabelValue } from '@/components/inputs/utils';
import { createLabelClass, kebabCase } from '@/utils/utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  name?: string;
  defaultChecked?: boolean;
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
  icon?: IconProps;
}

const Checkbox: FC<CheckboxProps> = ({ label, value, name, defaultChecked, filter, setFilter, icon }) => {
  const [isChecked, setChecked] = useState(filter?.[value as FilterTypes] ?? defaultChecked);
  const id = kebabCase(value);
  const labelValue = getLabelValue(name || '', value);
  const labelClass = name && createLabelClass(name, labelValue);

  return (
    <label
      htmlFor={id}
      className={['flex flex-row gap-2 rounded-md p-2 text-lg hover:bg-slate-400 lg:text-xl 2xl:text-2xl', labelClass]
        .filter(string => string)
        .join(' ')}
    >
      <input
        type="checkbox"
        className="text-link size-5 self-center rounded border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-2 focus:ring-blue-600"
        id={id}
        name={value}
        defaultChecked={isChecked}
        onChange={e => {
          if (filter && setFilter) {
            filter[value as FilterTypes] = e.target.checked;
            setFilter({ ...filter });
          }
          setChecked(e.target.checked);
        }}
      />
      <div className="flex flex-row items-center justify-center gap-1 xl:gap-2">
        {icon?.src && <Icon {...icon} />}
        {label || value}
      </div>
    </label>
  );
};

export default Checkbox;
