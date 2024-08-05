import type { FilterMap, FilterOptionsData } from '@/components/inputs/types';
import type { FC, FieldsetHTMLAttributes } from 'react';

import Carousel from '@/components/carousel/Carousel';
import MultiCheckbox from '@/components/inputs/Checkbox/MultiCheckbox';
import { kebabCase } from '@/utils/utils';

interface FilterOptionsProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultChecked'> {
  checkboxContainerClasses?: string;
  filterOptions: FilterOptionsData[];
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
  type?: 'carousel' | 'containers';
}

const FilterOptions: FC<FilterOptionsProps> = ({
  checkboxContainerClasses,
  filterOptions,
  filter,
  setFilter,
  type = 'containers',
  ...props
}) => {
  const filtersArray = filterOptions.map(({ label, name, data, defaultChecked }) => (
    <MultiCheckbox
      checkboxContainerClasses={checkboxContainerClasses}
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
  ));

  switch (type) {
    case 'carousel':
      return <Carousel slides={filtersArray} width="max-w-[90vw] lg:max-w-[39vw]" />;
    default:
      return <>{filtersArray}</>;
  }
};

export default FilterOptions;
