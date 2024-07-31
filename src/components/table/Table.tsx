import { isValidElement } from 'react';

import type { DirectionValues } from '@/components/inputs/types';
import type { HeadersType } from '@/components/table/types';
import type { FC, ReactNode, TableHTMLAttributes } from 'react';

import Button from '@/components/inputs/Button/TableSortButton';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  label?: string;
  labelSize?: string;
  sublabel?: ReactNode;
  headers?: HeadersType[] | ReactNode;
  body?: ReactNode;
  isSticky?: boolean;
  sortDirection?: DirectionValues;
  sortColumn?: string;
  setSortDirection?: React.Dispatch<React.SetStateAction<DirectionValues>>;
  setSortColumn?: React.Dispatch<React.SetStateAction<string>>;
}

const Table: FC<TableProps> = ({
  label,
  labelSize = 'text-3xl md:text-4xl lg:text-6xl',
  sublabel,
  headers,
  body,
  className,
  isSticky,
  sortDirection,
  sortColumn,
  setSortDirection,
  setSortColumn,
  ...props
}) => {
  const isSortHeader = setSortDirection && setSortColumn;

  const headersArray =
    headers &&
    !isValidElement(headers) &&
    (headers as unknown[] as HeadersType[]).map(el => {
      const { key, header } = typeof el === 'string' ? { key: el, header: el } : el;

      return (
        <th key={key} className="h-inherit text-base lg:text-xl">
          {isSortHeader ? (
            <Button
              id={key}
              sortDirection={sortColumn === key ? sortDirection : 0}
              setSortDirection={setSortDirection}
              setSortColumn={setSortColumn}
            >
              {header}
            </Button>
          ) : (
            header
          )}
        </th>
      );
    });

  return (
    <fieldset
      className={[
        'overflow-clip rounded-xl border-2 border-solid border-white bg-slate-900 text-3xl shadow-xl shadow-black',
        className,
      ].join(' ')}
    >
      {label && (
        <>
          <legend className={['mx-auto px-2 py-4 text-center sm:px-4', labelSize].join(' ')}>
            <h2>{label}</h2>
          </legend>
          {sublabel && sublabel}
        </>
      )}
      <>
        {body && (
          // eslint-disable-next-line tailwindcss/no-arbitrary-value
          <div className={['table-wrapper max-w-sm overflow-auto sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl 2xl:max-w-full', isSticky ? 'max-h-[50lvh]' : ''].join(' ')}>
            <table className="w-full" {...props}>
              <thead className={isSticky ? 'sticky-table-header' : ''}>
                <tr className="h-1">{headersArray || (isValidElement(headers) && headers)}</tr>
              </thead>
              <tbody>{body}</tbody>
            </table>
          </div>
        )}
      </>
    </fieldset>
  );
};

export default Table;
