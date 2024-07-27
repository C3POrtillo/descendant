import type { DefaultCheckedType, FilterMap } from '@/components/inputs/types';
import type { FC, InputHTMLAttributes } from 'react';

import Checkbox from '@/components/inputs/Checkbox';
import { setChecked } from '@/components/inputs/utils';

interface MultiCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultChecked'> {
  label: string;
  data: string[];
  defaultChecked?: DefaultCheckedType;
  filter?: FilterMap;
  setState?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const MultiCheckbox: FC<MultiCheckboxProps> = ({ label, data, name, defaultChecked = false, filter, setState }) => (
  <fieldset className="flex w-max grow rounded-lg border-2 border-solid border-white bg-slate-800 p-4 text-3xl shadow-md shadow-black">
    <legend className="px-4 text-center">{label}</legend>
    <div
      className={`grid ${
        data.length > 6 ? 'grid-flow-col grid-rows-4' : 'w-full grid-cols-1'
      } place-content-center gap-4 text-lg`}
    >
      {data.map((value, index) => (
        <Checkbox
          key={value}
          name={name}
          value={value}
          defaultChecked={setChecked(defaultChecked, value, index)}
          filter={filter}
          setState={setState}
        />
      ))}
    </div>
  </fieldset>
);

export default MultiCheckbox;
