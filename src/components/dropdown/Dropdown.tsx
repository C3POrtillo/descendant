/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useRef, useState } from 'react';

import type { FC, PropsWithChildren } from 'react';

interface DropdownProps extends PropsWithChildren {
  label: string;
}

const Dropdown: FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleChildClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex w-full items-center justify-center rounded-xl px-4 text-left align-middle hover:bg-slate-400"
    >
      <button onClick={toggleDropdown} className="text-link flex w-full justify-center gap-4 rounded-md">
        {label}
        <i
          className={['fa link-icon self-center', isOpen ? 'fa-chevron-up' : 'fa-chevron-down']
            .filter(string => string)
            .join(' ')}
        />
      </button>
      {isOpen && children && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className="absolute left-0 top-0 mt-9 w-full gap-4 rounded-xl border-2 border-solid border-white bg-slate-900 p-4 lg:mt-12 lg:w-auto"
          onClick={handleChildClick}
        >
          <div className="flex min-h-max w-full min-w-full flex-col ">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
