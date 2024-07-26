
import type { FilterMap} from '@/components/weapon/types';
import type { FC, InputHTMLAttributes } from 'react';

import Checkbox from '@/components/inputs/Checkbox';
import { setChecked } from '@/components/inputs/utils';

interface MultiCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultChecked'> {
  label: string;
  data: string[];
  defaultChecked?: number | string | 'all';
  filter?: FilterMap;
  setState?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const MultiCheckbox: FC<MultiCheckboxProps> = ({ label, data, name, defaultChecked = 0, filter, setState }) => (
  <fieldset className="flex w-max rounded-lg border-2 border-solid border-white bg-slate-800 p-4 text-2xl">
    <legend className="px-4 text-center">{label}</legend>
    <div
      className={`grid ${
        data.length > 6 ? 'grid-flow-col grid-rows-4' : 'w-full grid-cols-1'
      } place-content-center gap-4 text-lg`}
    >
      {data.map((value, index) => (
        <Checkbox key={value} name={name} value={value} defaultChecked={setChecked(defaultChecked, value, index)} filter={filter} setState={setState}/> 
      ))}
    </div>
  </fieldset>
);

export default MultiCheckbox;
