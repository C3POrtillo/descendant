import { useEffect, useRef, useState } from 'react';

import type { FC, PropsWithChildren, ReactNode } from 'react';

interface DropdownProps extends PropsWithChildren {
  label: string | ReactNode;
  icon?: string;
}

const Accordion: FC<DropdownProps> = ({ label, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [labelIsClickable, _] = useState(typeof label === 'string');
  const panelRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const panelClasses = 'accordion-panel flex w-full flex-col gap-4 bg-slate-900'

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
      if (panelRef.current && accordionRef.current) {
        panelRef.current.style.maxHeight = `${panelRef.current.scrollHeight + 32}px`;
        panelRef.current.style.overflow = 'visible';
        panelRef.current.className = [panelClasses, 'px-6 py-3'].join(' ')
      }
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
      if (panelRef.current && accordionRef.current) {
        panelRef.current.style.maxHeight = '0px';
        panelRef.current.style.overflow = 'hidden';
        panelRef.current.className = panelClasses
      }
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const faIcon = icon || (isOpen ? 'fa-chevron-up' : 'fa-chevron-down');

  return (
    <div ref={accordionRef} className="flex w-full flex-col">
      <div className="flex flex-row">
        {labelIsClickable && label}
        <button onClick={toggleDropdown} className="text-link inline-flex w-full items-center justify-between gap-4 rounded-md px-6">
          {!labelIsClickable && label}
          <i className={['fa tfd-link-icon self-center', faIcon].join(' ')} />
        </button>
      </div>
      <div ref={panelRef} className={panelClasses}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
