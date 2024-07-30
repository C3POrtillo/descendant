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
      <div className="max-w-sm rotate-180 overflow-x-auto sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md 2xl:max-w-full">
        {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
        <table className="w-full rotate-180" {...props}>
          {headers && (
            <thead className={isSticky ? 'sticky-below-header' : ''}>
              <tr>{headers}</tr>
            </thead>
          )}
          <tbody>{body}</tbody>
        </table>
      </div>
    </fieldset>
  );

export default Table;
