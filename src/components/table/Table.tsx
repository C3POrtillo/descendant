import type { FC, ReactNode, TableHTMLAttributes } from 'react';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  label?: string;
  headers?: ReactNode;
  body?: ReactNode;
}

const Table: FC<TableProps> = ({ label, headers, body, className, ...props }) => (
  <fieldset className={`table-wrapper rounded-xl border-2 border-solid border-white bg-slate-900 text-3xl shadow-xl shadow-black ${className}`}>
    <legend className="p-4 text-center text-6xl">{label}</legend>
    {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
    <table className="w-full overflow-clip rounded-xl" {...props}>
      <thead>
        <tr className="sticky-table">{headers}</tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  </fieldset>
);

export default Table;
