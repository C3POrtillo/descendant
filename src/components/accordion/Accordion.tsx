import { useEffect, useRef, useState } from 'react';

import type { FC, PropsWithChildren, ReactNode } from 'react';

interface AccordionProps extends PropsWithChildren {
  className?: string;
  panelClassName?: string;
  label: string | ReactNode;
  icon?: string;
  labelIsClickable?: boolean;
}

const Accordion: FC<AccordionProps> = ({ className, panelClassName, label, icon, children, labelIsClickable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClickable, _] = useState(labelIsClickable || typeof label === 'string');
  const panelRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const panelClasses = 'accordion-panel';

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
        panelRef.current.className = [panelClasses, panelClassName || 'py-4'].filter(string => string).join(' ');
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
    <div
      ref={accordionRef}
      className={['flex w-full flex-col overflow-hidden', className].filter(string => string).join(' ')}
    >
      <div className="flex w-full flex-row items-center justify-between p-4 md:px-6">
        {!isClickable && label}
        <button
          onClick={toggleDropdown}
          className={[
            'text-link inline-flex flex-row items-center justify-between gap-4 rounded-md',
            isClickable && 'w-full',
          ]
            .filter(string => string)
            .join(' ')}
        >
          {isClickable && label}
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
