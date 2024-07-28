/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';

import type { FC, ReactNode } from 'react';

interface AccordionProps {
  label: string;
  options: ReactNode[];
}

const Accordion: FC<AccordionProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block w-full items-center justify-center rounded-xl px-4 py-1 text-left align-middle hover:bg-slate-400">
      <button onClick={toggleDropdown} className="inline-flex w-full justify-center rounded-md">
        {label} 
        <i className={['fa self-center ml-4', isOpen ? 'fa-chevron-up' : 'fa-chevron-down'].join(' ')} />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-3 flex min-h-max flex-col gap-4 rounded-xl border-2 border-solid border-white bg-slate-900 p-4">
          {options}
        </div>
      )}
    </div>
  );
};

export default Accordion;
