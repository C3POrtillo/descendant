import type { FC, InputHTMLAttributes } from 'react';

interface TextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setState?: React.Dispatch<React.SetStateAction<string>>;
}

const Text: FC<TextProps> = ({ type, label, id, name, value, setState, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-lg" htmlFor={id}>
      {label}
      {props.required && '*'}
    </label>
    <input
      className="rounded-lg"
      type={type || 'text'}
      id={id}
      name={name}
      value={value}
      onChange={e => {
        setState && setState(e.target.value);
      }}
      {...props}
    />
  </div>
);

export default Text;
