import type { FilterOptionsData } from '@/components/inputs/types'
import type { FilterMap } from '@/components/weapon/types';
import type { FC } from 'react'

import MultiCheckbox from '@/components/inputs/MultiCheckbox'



interface FilterOptionsProps {
  filterOptions: FilterOptionsData[];
  filter?: FilterMap;
  setState?: React.Dispatch<React.SetStateAction<FilterMap>>;
  className?: string;
}

const FilterOptions: FC<FilterOptionsProps> = ({filterOptions, filter, setState, className}) => (
  <div className={`flex flex-row gap-4 ${className}`}>
    {filterOptions.map(({ label, name, data }) => (
      <MultiCheckbox
        key={label}
        label={label}
        name={name}
        data={[...data]}
        defaultChecked="all"
        filter={filter}
        setState={setState}
      />
    ))}
  </div>)

export default FilterOptions
