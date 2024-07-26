import type { FilterMap, FilterTypes } from '@/utils/types';
import type { FC, InputHTMLAttributes } from 'react';

import { defaultChecked, getLabelClass } from '@/components/inputs/utils';
import { titleCase } from '@/utils/utils';

interface MultiCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  data: string[];
  defaultSelect?: number | string | 'all';
  filter?: FilterMap;
  setState?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const MultiCheckbox: FC<MultiCheckboxProps> = ({ label, data, name, defaultSelect = 0, filter, setState }) => (
  <fieldset className="flex w-max rounded-lg border-2 border-solid border-white bg-slate-800 p-4 text-2xl">
    <legend className="px-4 text-center">{label}</legend>
    <div
      className={`grid ${
        data.length > 6 ? 'grid-flow-col grid-rows-4' : 'w-full grid-cols-1'
      } place-content-center gap-4 text-lg`}
    >
      {data.map((value, index) => (
        <div key={value} className="text-nowrap">
          <label htmlFor={value} className={`flex w-full flex-row gap-4 ${name ? getLabelClass(name, value) : ''}`}>
            <input
              type="checkbox"
              id={value}
              name={value}
              defaultChecked={defaultChecked(defaultSelect, value, index)}
              onChange={e => {
                if (filter && setState) {
                  filter[value as FilterTypes] = e.target.checked
                  setState({...filter})
                }
              }}
            />
            {titleCase(value)}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

export default MultiCheckbox;
