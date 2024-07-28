/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';

import type { ButtonProps } from '@/components/inputs/Button/Button';
import type { FC } from 'react';

interface SortButtonProps extends ButtonProps {
  setState?: React.Dispatch<React.SetStateAction<unknown>>;
}

const Button: FC<SortButtonProps> = ({ setState, children }) => {
  const [sortDirection, setSortDirection] = useState('');

  return (
    <button
      className="sort-button flex flex-row justify-between gap-4 p-2"
      onClick={() => {
        setState && setSortDirection(sortDirection);
      }}
    >
      <div className="p-auto my-auto flex grow items-center justify-center align-middle ">{children}</div>
      <div className="button-arrows my-auto flex flex-col">
        <i className="fa fa-chevron-up" />
        <i className="fa fa-chevron-down" />
      </div>
    </button>
  );
};

export default Button;
