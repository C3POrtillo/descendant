/* eslint-disable tailwindcss/no-custom-classname */
import type { ButtonProps } from '@/components/inputs/Button/Button';
import type { DirectionValues } from '@/components/inputs/types';
import type { FC } from 'react';

interface SortButtonProps extends ButtonProps {
  id: string;
  sortDirection?: DirectionValues;
  setSortDirection: React.Dispatch<React.SetStateAction<DirectionValues>>;
  setSortColumn: React.Dispatch<React.SetStateAction<string>>;
}

const Button: FC<SortButtonProps> = ({ id, sortDirection = 0, setSortDirection, setSortColumn, children }) => {
  const isNeutral = sortDirection === 0;
  const isAscending = sortDirection === 1;
  const isDescending = sortDirection === 2;

  const arrowClasses =
    (isNeutral && 'justify-between') || (isAscending && 'justify-start') || (isDescending && 'justify-end');

  return (

    <button
      className="sort-button m-2 flex flex-row justify-between gap-4"
      onClick={() => {
        if (sortDirection === 2) {
          setSortDirection(0);
          setSortColumn('');
        } else {
          setSortDirection((sortDirection + 1) as DirectionValues);
          setSortColumn(id || '');
        }
      }}
    >
      <div className="p-auto my-auto flex grow items-center justify-center align-middle">{children}</div>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className={['button-arrows h-[66px] max-h-[66px] flex flex-col justify-center', arrowClasses].join(' ')}>
        {(isNeutral || isAscending) && <i className="fa fa-chevron-up" />}
        {(isNeutral || isDescending) && <i className="fa fa-chevron-down" />}
      </div>
    </button>

  );
};

export default Button;
