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
  headerWidths?: string[] | readonly string[];
  body?: ReactNode;
  isSticky?: boolean;
  sortDirection?: DirectionValues;
  sortColumn?: string;
  setSortDirection?: React.Dispatch<React.SetStateAction<DirectionValues>>;
  setSortColumn?: React.Dispatch<React.SetStateAction<string>>;
  isMaxWidth?: boolean;
}

const Table: FC<TableProps> = ({
  label,
  labelSize = 'text-2xl md:text-3xl xl:text-4xl 2x:text-5xl',
  sublabel,
  headers,
  headerWidths,
  body,
  className,
  isSticky,
  sortDirection,
  sortColumn,
  setSortDirection,
  setSortColumn,
  isMaxWidth,
  ...props
}) => {
  const isSortHeader = setSortDirection && setSortColumn;

  const headersArray =
    headers &&
    !isValidElement(headers) &&
    (headers as unknown[] as HeadersType[]).map((el, index) => {
      const { key, header } = typeof el === 'string' ? { key: el, header: el } : el;
      const width = headerWidths?.[index];

      return (
        <th key={key} className={['h-inherit text-lg lg:text-xl', width].filter(string => string).join(' ')}>
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
        isMaxWidth && '2xl:w-full',
        className,
      ]
        .filter(string => string)
        .join(' ')}
    >
      {label && (
        <>
          <legend className={['mx-auto px-2 py-4 text-center sm:px-4', labelSize].filter(string => string).join(' ')}>
            <h2>{label}</h2>
          </legend>
          {sublabel && sublabel}
        </>
      )}
      <div
        className={[
          'table-wrapper max-w-sm overflow-auto sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl 2xl:max-w-full',
          isSticky && 'max-h-[75lvh] md:max-h-[80lvh]',
        ]
          .filter(string => string)
          .join(' ')}
      >
        <table className="w-full" {...props}>
          <thead className={isSticky ? 'sticky-table-header' : undefined}>
            <tr className="h-1">{headersArray || (isValidElement(headers) && headers)}</tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
      </div>
    </fieldset>
  );
};

export default Table;
