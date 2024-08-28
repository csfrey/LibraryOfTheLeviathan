import { Adventure } from "@/components/config/types";
import { DomainTable, getSortableHeader } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

const AdventuresTable = ({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data: Adventure[];
}) => {
  const columns: ColumnDef<Adventure>[] = [
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
      // Time to complete
      header: getSortableHeader("Approx. Time"),
      accessorKey: "timeToComplete",
      accessorFn: (a) => `${a.timeToComplete} hours`,
    },
    {
      // # of Characters
      header: getSortableHeader("# of Characters"),
      accessorKey: "numberOfCharacters",
    },
    {
      // Level
      header: getSortableHeader("Character Level"),
      accessorKey: "levels",
    },
    {
      // Summary
      header: "Summary",
      accessorKey: "summary",
    },
  ];

  return (
    <DomainTable
      title="Adventures"
      isFetching={isFetching}
      columns={columns}
      data={data}
    />
  );
};

export default AdventuresTable;
