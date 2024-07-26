import type { FC, ReactNode, TableHTMLAttributes } from 'react';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  label?: string;
  headers?: ReactNode;
  body?: ReactNode;
}

const Table: FC<TableProps> = ({ label, headers, body, className, ...props }) => (
  <fieldset className={`table-wrapper ${className}`}>
    <legend className="p-4 text-center text-5xl">{label}</legend>
    <table className="w-full overflow-hidden rounded-xl" {...props}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  </fieldset>
);

export default Table;
