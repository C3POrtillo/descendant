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
      className="flex h-full items-center justify-between gap-1 p-2 hover:bg-slate-400"
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
      <div className="p-auto flex grow justify-center self-center">{children}</div>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div
        className={[
          'button-arrows max-h[48px] flex h-[48px] flex-col self-center xl:h-[56px] xl:max-h-[56px]',
          arrowClasses,
        ]
          .filter(string => string)
          .join(' ')}
      >
        {(isNeutral || isAscending) && <i className="fa fa-chevron-up" />}
        {(isNeutral || isDescending) && <i className="fa fa-chevron-down" />}
      </div>
    </button>
  );
};

export default Button;
