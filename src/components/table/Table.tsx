import type { FC, ReactNode, TableHTMLAttributes } from 'react';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  label: string;
  headers: ReactNode;
  body: ReactNode;
}

const Table: FC<TableProps> = ({label, headers, body, className, ...props}) => (
  <fieldset className={className}>
    <legend className="p-4 text-center text-5xl">{label}</legend>
    <table className="w-full bg-slate-700" {...props}>
      <thead>
        <tr className="rounded-2xl bg-slate-700">
          {headers}
        </tr>
      </thead>
      <tbody>
        {body}
      </tbody>
    </table>
  </fieldset>
)

export default Table;

