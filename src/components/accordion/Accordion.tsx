import { useEffect, useRef, useState } from 'react';

import type { FC, PropsWithChildren, ReactNode } from 'react';

interface AccordionProps extends PropsWithChildren {
  label: string | ReactNode;
  icon?: string;
}

const Accordion: FC<AccordionProps> = ({ label, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [labelIsClickable, _] = useState(typeof label !== 'string');
  const panelRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const panelClasses = 'accordion-panel px-6';

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      if (panelRef.current && accordionRef.current) {
        panelRef.current.style.maxHeight = `${panelRef.current.scrollHeight + 64}px`;
        panelRef.current.style.overflow = 'visible';
        panelRef.current.className = [panelClasses, 'py-3 sm:py-6'].filter(string => string).join(' ');
      }
    } else {
      document.removeEventListener('click', handleClickOutside);
      if (panelRef.current && accordionRef.current) {
        panelRef.current.style.maxHeight = '0px';
        panelRef.current.style.overflow = 'hidden';
        panelRef.current.className = panelClasses;
      }
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const faIcon = icon || (isOpen ? 'fa-chevron-up' : 'fa-chevron-down');

  return (
    <div ref={accordionRef} className="flex w-full flex-col overflow-hidden">
      <div className="flex w-full flex-row items-center justify-between p-4 md:px-6">
        {labelIsClickable && label}
        <button
          onClick={toggleDropdown}
          className={[
            'text-link inline-flex flex-row items-center justify-between gap-4 rounded-md',
            !labelIsClickable && 'w-full',
          ]
            .filter(string => string)
            .join(' ')}
        >
          {!labelIsClickable && label}
          <i className={['fa tfd-link-icon self-center', faIcon].filter(string => string).join(' ')} />
        </button>
      </div>
      <div ref={panelRef} className={panelClasses}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
