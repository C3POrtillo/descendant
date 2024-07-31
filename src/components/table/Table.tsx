import { isValidElement } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import type { DirectionValues } from '@/components/inputs/types';
import type { HeadersType } from '@/components/table/types';
import type { FC, ReactNode, TableHTMLAttributes } from 'react';

import Button from '@/components/inputs/Button/TableSortButton';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
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
  const tableSize =
    'max-w-sm overflow-x-auto sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-full';

  const headersArray =
    headers &&
    !isValidElement(headers) &&
    (headers as unknown[] as HeadersType[]).map(el => {
      const { key, header } = typeof el === 'string' ? { key: el, header: el } : el;

      return (
        <div key={key} className="text-base lg:text-xl">
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
        </div>
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
          <legend className={['mx-auto p-4 text-center', labelSize].join(' ')}>
            <h2>{label}</h2>
          </legend>
          {sublabel && sublabel}
        </>
      )}
      <ScrollSync>
        <>
          <div className={isSticky ? 'sticky-below-header bg-slate-900 shadow-md shadow-black' : ''}>
            <ScrollSyncPane>
              <div className={tableSize}>
                {headers && (
                  <div className="flex flex-row justify-between">
                    {headersArray || (isValidElement(headers) && headers)}
                  </div>
                )}
              </div>
            </ScrollSyncPane>
          </div>
          {body && (
            <ScrollSyncPane>
              <div className={tableSize}>
                <table className="min-w-full" {...props}>
                  <tbody>{body}</tbody>
                </table>
              </div>
            </ScrollSyncPane>
          )}
        </>
      </ScrollSync>
    </fieldset>
  );
};

export default Table;
