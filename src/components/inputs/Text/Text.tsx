import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

import type { FC, InputHTMLAttributes } from 'react';

interface TextProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  setState?: React.Dispatch<React.SetStateAction<string>>;
}

const Text: FC<TextProps> = ({ type, label, id, name, value, setState, ...props }) => {
  const [liveValue, setLiveValue] = useState(value as string);

  const throttledSetState = throttle((newValue: string) => {
    setState && setState(newValue);
  }, 500);

  useEffect(() => {
    throttledSetState(liveValue);

    return () => {
      throttledSetState.cancel();
    };
  }, [liveValue, throttledSetState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiveValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="flex text-lg" htmlFor={id}>
          {label}
          {props.required && '*'}
        </label>
      )}
      <input
        className="flex w-full rounded-lg border-gray-600 bg-gray-700 text-2xl ring-offset-gray-800 focus:ring-2 focus:ring-blue-600"
        type={type || 'text'}
        id={id}
        name={name}
        value={liveValue}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default Text;
