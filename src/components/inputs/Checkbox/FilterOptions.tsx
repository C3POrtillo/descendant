import type { FilterMap, FilterOptionsData } from '@/components/inputs/types';
import type { FC } from 'react';

import MultiCheckbox from '@/components/inputs/Checkbox/MultiCheckbox';

interface FilterOptionsProps {
  filterOptions: FilterOptionsData[];
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const FilterOptions: FC<FilterOptionsProps> = ({ filterOptions, filter, setFilter }) => (
  <>
    {filterOptions.map(({ label, name, data, defaultChecked }) => (
      <MultiCheckbox
        key={label}
        label={label}
        name={name}
        data={data}
        defaultChecked={defaultChecked ?? 'all'}
        filter={filter}
        setFilter={setFilter}
      />
    ))}
  </>
);

export default FilterOptions;
