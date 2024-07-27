/* eslint-disable tailwindcss/no-custom-classname */
import type { ButtonHTMLAttributes, FC } from 'react';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children }) => (
  <button className="sort-button flex flex-row justify-between gap-4 px-6 py-2">
    <div className="p-auto my-auto flex grow items-center justify-center align-middle ">
      {children}
    </div>
    <div className="button-arrows my-auto flex flex-col">
      <i className="fa fa-chevron-up"/>
      <i className="fa fa-chevron-down"/>
    </div>
  </button>
);

export default Button;
