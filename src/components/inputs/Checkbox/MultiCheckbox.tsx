import type { DefaultCheckedType, FilterMap, LabelData } from '@/components/inputs/types';
import type { FC, FieldsetHTMLAttributes } from 'react';

import AccordionCheckbox from '@/components/inputs/Checkbox/AccordionCheckbox';
import Checkbox from '@/components/inputs/Checkbox/Checkbox';
import { checkboxBorderClasses } from '@/components/inputs/types';
import { getCheckboxContainerClasses, setChecked } from '@/components/inputs/utils';
import use2xlScreen from '@/utils/useLargeScreen';

interface MultiCheckboxProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultChecked'> {
  checkboxContainerClasses?: string;
  label: string;
  data: LabelData[];
  defaultChecked?: DefaultCheckedType;
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
  type?: 'carousel' | 'containers' | 'accordion';
}

const MultiCheckbox: FC<MultiCheckboxProps> = ({
  checkboxContainerClasses,
  label,
  data,
  name,
  defaultChecked = false,
  filter,
  setFilter,
  type,
}) => {
  const is2xlScreen = use2xlScreen();

  const gridSize = getCheckboxContainerClasses(checkboxContainerClasses, data.length);

  const checkboxContainer = (
    <div className={['grid w-full text-lg', gridSize].join(' ')}>
      {data.map(({ label: checkboxLabel, value, icon }, index) => (
        <Checkbox
          key={value}
          label={checkboxLabel}
          name={name}
          value={value}
          defaultChecked={setChecked(defaultChecked, value, index)}
          filter={filter}
          setFilter={setFilter}
          icon={icon}
        />
      ))}
    </div>
  );

  return !is2xlScreen || type === 'accordion' ? (
    <AccordionCheckbox label={label} checkboxContainer={checkboxContainer} name={name} />
  ) : (
    <fieldset className={['input-hover w-max grow px-2 py-4', checkboxBorderClasses].join(' ')}>
      <legend className="px-4 text-center">
        <h2>{label}</h2>
      </legend>
      {checkboxContainer}
    </fieldset>
  );
};

export default MultiCheckbox;
