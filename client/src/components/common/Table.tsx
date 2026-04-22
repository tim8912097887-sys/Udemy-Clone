type TableProps = React.HTMLAttributes<HTMLTableElement>;
type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;
type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;
type TableCellProps = React.HTMLAttributes<HTMLTableCellElement>;
type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

const Table = ({ children, className = "", ...props }: TableProps) => {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={`w-full caption-bottom text-sm ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

const Header = ({ children, className = "", ...props }: TableSectionProps) => {
  return (
    <thead className={`[&_tr]:border-b ${className}`} {...props}>
      {children}
    </thead>
  );
};

const Body = ({ children, className = "", ...props }: TableSectionProps) => {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
      {children}
    </tbody>
  );
};

const Footer = ({ children, className = "", ...props }: TableSectionProps) => {
  return (
    <tfoot
      className={`border-t bg-slate-50/50 font-medium [&>tr]:last:border-b-0 ${className}`}
      {...props}
    >
      {children}
    </tfoot>
  );
};

const Row = ({ children, className = "", ...props }: TableRowProps) => {
  return (
    <tr
      className={`border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-100 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

const Head = ({ children, className = "", ...props }: TableCellProps) => {
  return (
    <th
      className={`h-10 px-2 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

const Cell = ({ children, className = "", ...props }: TableCellProps) => {
  return (
    <td
      className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

const Caption = ({ children, className = "", ...props }: TableCaptionProps) => {
  return (
    <caption className={`mt-4 text-sm text-slate-500 ${className}`} {...props}>
      {children}
    </caption>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;
Table.Head = Head;
Table.Cell = Cell;
Table.Caption = Caption;

export default Table;
