import type { FilterMap, FilterOptionsData } from '@/components/inputs/types';
import type { FC, FieldsetHTMLAttributes } from 'react';

import MultiCheckbox from '@/components/inputs/Checkbox/MultiCheckbox';
import { kebabCase } from '@/utils/utils';

interface FilterOptionsProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultChecked'> {
  filterOptions: FilterOptionsData[];
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const FilterOptions: FC<FilterOptionsProps> = ({ filterOptions, filter, setFilter, ...props }) => (
  <>
    {filterOptions.map(({ label, name, data, defaultChecked }) => (
      <MultiCheckbox
        id={kebabCase(label)}
        key={label}
        label={label}
        name={name}
        data={data}
        defaultChecked={defaultChecked ?? 'all'}
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
    ))}
  </>
);

export default FilterOptions;
