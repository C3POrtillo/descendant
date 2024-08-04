import type { ButtonHTMLAttributes, FC } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ className, children, ...props }) => (
  <button className={['tfd-link button', className].join(' ')} {...props}>
    {children}
  </button>
);

export default Button;
