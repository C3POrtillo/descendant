/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useRef, useState } from 'react';

import type { FC, PropsWithChildren } from 'react';

interface DropdownProps extends PropsWithChildren {
  label: string;
}

const Dropdown: FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
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
      className="relative inline-block w-full items-center justify-center rounded-xl px-4 py-1 text-left align-middle hover:bg-slate-400"
    >
      <button onClick={toggleDropdown} className="text-link inline-flex w-full justify-center gap-4 rounded-md">
        {label}
        <i className={['fa link-icon self-center', isOpen ? 'fa-chevron-up' : 'fa-chevron-down'].join(' ')} />
      </button>
      {isOpen && children && (
        <div className="absolute left-0 mt-3 flex min-h-max flex-col gap-4 rounded-xl border-2 border-solid border-white bg-slate-900 p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
