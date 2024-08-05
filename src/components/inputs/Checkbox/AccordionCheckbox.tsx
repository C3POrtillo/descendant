import type { FC, ReactNode } from 'react';

import Accordion from '@/components/accordion/Accordion';
import { checkboxBorderClasses } from '@/components/inputs/types';
import { createLabelClass } from '@/utils/utils';

interface AccordionCheckboxProps {
  name?: string;
  label: string;
  checkboxContainer: ReactNode;
}

const AccordionCheckbox: FC<AccordionCheckboxProps> = ({ name, label, checkboxContainer }) => {
  const accordionSize = 'lg:flex-auto lg:basis-[calc(33.333%-1rem)]';
  const labelClass = name && createLabelClass(name, name);

  return (
    <div className={['h-min w-full', checkboxBorderClasses, accordionSize].filter(string => string).join(' ')}>
      <Accordion
        className="input-hover"
        panelClassName="pb-4"
        label={
          <div className={['text-lg md:text-xl xl:text-2xl', labelClass].filter(string => string).join(' ')}>
            {label}
          </div>
        }
        labelIsClickable
      >
        {checkboxContainer}
      </Accordion>
    </div>
  );
};

export default AccordionCheckbox;
