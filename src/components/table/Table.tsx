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
  labelSize = 'text-6xl',
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
      <div className="overflow-x-auto">
        {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
        <table className="w-full rounded-xl" {...props}>
          {headers && (
            <thead>
              <tr className={isSticky ? '' : ''}>{headers}</tr>
            </thead>
          )}
          <tbody>{body}</tbody>
        </table>
      </div>
    </fieldset>
  );

export default Table;
