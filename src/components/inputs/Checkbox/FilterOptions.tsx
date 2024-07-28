import type { FilterMap, FilterOptionsData } from '@/components/inputs/types';
import type { FC } from 'react';

import MultiCheckbox from '@/components/inputs/Checkbox/MultiCheckbox';

interface FilterOptionsProps {
  filterOptions: FilterOptionsData[];
  filter?: FilterMap;
  setState?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const FilterOptions: FC<FilterOptionsProps> = ({ filterOptions, filter, setState }) => (
  <>
    {filterOptions.map(({ label, name, data, defaultChecked }) => (
      <MultiCheckbox
        key={label}
        label={label}
        name={name}
        data={data}
        defaultChecked={defaultChecked || 'all'}
        filter={filter}
        setState={setState}
      />
    ))}
  </>
);

export default FilterOptions;
