import type { ButtonHTMLAttributes, FC } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ className, children, ...props }) => (
  <button
    className={['tfd-link text-link text-hover input-hover button', className].filter(string => string).join(' ')}
    {...props}
  >
    {children}
  </button>
);

export default Button;
