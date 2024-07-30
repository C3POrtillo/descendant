import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import type { FC, ReactNode, TableHTMLAttributes } from 'react';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  label?: string;
  labelSize?: string;
  sublabel?: ReactNode;
  headers?: ReactNode;
  body?: ReactNode;
  isSticky?: boolean;
}

const Table: FC<TableProps> = ({
  label,
  labelSize = 'text-3xl md:text-4xl lg:text-6xl',
  sublabel,
  headers,
  body,
  className,
  isSticky,
  ...props
}) =>
  body && (
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
              <div className="overflow-auto sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md 2xl:max-w-full">
                <div className="flex min-w-full flex-row">{headers}</div>
              </div>
            </ScrollSyncPane>
          </div>
          <ScrollSyncPane>
            <div className="flex max-w-sm flex-col overflow-x-auto sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md 2xl:max-w-full">
              <table className="min-w-full" {...props}>
                <tbody>{body}</tbody>
              </table>
            </div>
          </ScrollSyncPane>
        </>
      </ScrollSync>
    </fieldset>
  );

export default Table;
