import type { DefaultCheckedType, FilterMap, LabelData } from '@/components/inputs/types';
import type { FC,FieldsetHTMLAttributes} from 'react';

import Accordion from '@/components/accordion/Accordion';
import Checkbox from '@/components/inputs/Checkbox/Checkbox';
import { setChecked } from '@/components/inputs/utils';
import useLargeScreen from '@/utils/useLargeScreen';

interface MultiCheckboxProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultChecked'> {
  label: string;
  data: LabelData[];
  defaultChecked?: DefaultCheckedType;
  filter?: FilterMap;
  setFilter?: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const MultiCheckbox: FC<MultiCheckboxProps> = ({ label, data, name, defaultChecked = false, filter, setFilter }) => {
  const isLargeScreen = useLargeScreen()

  const threshold = data.length > 6;
  const gridSize = threshold ? 'grid-cols-2 lg:grid-flow-col lg:grid-rows-4 lg:grid-cols-0' : 'grid-cols-1';
  const accordionSize = 'lg:flex-auto lg:basis-[calc(33.333%-1rem)]';
  const checkboxContainer = (
    <div className={['grid w-full place-content-center gap-4 text-lg', gridSize].join(' ')}>
      {data.map(({ value, icon }, index) => (
        <Checkbox
          key={value}
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
  const wrapperClasses =
    'rounded-lg border-2 border-solid border-white bg-slate-900 p-4 text-3xl shadow-md shadow-black';

  return isLargeScreen ? (
    <fieldset className={['w-max grow', wrapperClasses].join(' ')}>
      <legend className="px-4 text-center">
        <h2>{label}</h2>
      </legend>
      {checkboxContainer}
    </fieldset>
  ) : (
    <div className={['h-min w-full', wrapperClasses, accordionSize].join(' ')}>
      <Accordion label={label}>{checkboxContainer}</Accordion>
    </div>
  );
};

export default MultiCheckbox;
