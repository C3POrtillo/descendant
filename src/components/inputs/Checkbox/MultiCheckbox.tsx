import type { DefaultCheckedType, FilterMap, LabelData } from '@/components/inputs/types';
import type { FC, FieldsetHTMLAttributes } from 'react';

import Accordion from '@/components/accordion/Accordion';
import Checkbox from '@/components/inputs/Checkbox/Checkbox';
import { setChecked } from '@/components/inputs/utils';
import use2xlScreen from '@/utils/useLargeScreen';
import { createLabelClass } from '@/utils/utils';

interface MultiCheckboxProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultChecked'> {
  label: string;
  data: LabelData[];
  defaultChecked?: DefaultCheckedType;
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const MultiCheckbox: FC<MultiCheckboxProps> = ({ label, data, name, defaultChecked = false, filter, setFilter }) => {
  const isLargeScreen = use2xlScreen();

  const threshold = data.length > 6;
  const gridSize = threshold
    ? 'grid-cols-2 lg:grid-flow-col lg:grid-rows-4 lg:grid-cols-0'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1';
  const accordionSize = 'lg:flex-auto lg:basis-[calc(33.333%-1rem)]';
  const wrapperClasses = 'rounded-lg border-2 border-solid border-white bg-slate-900 text-3xl shadow-md shadow-black';

  const checkboxContainer = (
    <div className={['grid w-full place-content-center text-lg', gridSize].join(' ')}>
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

  const labelClass = name ? createLabelClass(name, name) : ''
  
  return isLargeScreen ? (
    <fieldset className={['input-hover w-max grow px-2 py-4', wrapperClasses].join(' ')}>
      <legend className="px-4 text-center">
        <h2>{label}</h2>
      </legend>
      {checkboxContainer}
    </fieldset>
  ) : (
    <div className={['h-min w-full', wrapperClasses, accordionSize].join(' ')}>
      <Accordion label={<div className={['text-base lg:text-xl xl:text-2xl', labelClass].join(' ')}>{label}</div>}>{checkboxContainer}</Accordion>
    </div>
  );
};

export default MultiCheckbox;
