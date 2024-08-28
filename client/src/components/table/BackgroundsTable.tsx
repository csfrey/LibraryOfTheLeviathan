import { Background } from "@/types";
import { DomainTable, getSortableHeader } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

const BackgroundsTable = ({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data: Background[];
}) => {
  const columns: ColumnDef<Background>[] = [
    {
      // Name
      header: getSortableHeader("Name"),
      accessorKey: "name",
    },
    {
      // Source
      header: getSortableHeader("Source"),
      accessorKey: "source",
      accessorFn: (a) => `${a.source}, p.  ${a.page}`,
    },
    {
      // Summary
      header: "Summary",
      accessorKey: "summary",
    },
  ];

  return (
    <DomainTable
      title="Backgrounds"
      isFetching={isFetching}
      columns={columns}
      data={data}
    />
  );
};

export default BackgroundsTable;
