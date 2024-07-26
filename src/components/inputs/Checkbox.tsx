import type { FilterMap, FilterTypes } from '@/components/weapon/types';
import type { FC, InputHTMLAttributes } from 'react';

import { getLabelClass } from '@/components/inputs/utils';
import { titleCase } from '@/utils/utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  name?: string;
  defaultChecked?: boolean;
  filter?: FilterMap;
  setState?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const Checkbox: FC<CheckboxProps> = ({ value, name, defaultChecked, filter, setState }) => (
  <div key={value} className="text-nowrap">
    <label htmlFor={value} className={`flex w-full flex-row gap-4 ${name ? getLabelClass(name, value) : ''}`}>
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
      {titleCase(value)}
    </label>
  </div>
);

export default Checkbox;
