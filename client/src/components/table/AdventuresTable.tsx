import { Adventure } from "@/types";
import { DomainTable } from "./DataTable";
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
      header: "Name",
      accessorKey: "name",
    },
    {
      // Source
      header: "Source",
      accessorFn: (a) => `${a.source}, p.  ${a.page}`,
    },
    {
      // Time to complete
      header: "Approx. Time",
      accessorFn: (a) => `${a.timeToComplete} hours`,
    },
    {
      // # of Characters
      header: "# of Characters",
      accessorKey: "numberOfCharacters",
    },
    {
      // Level
      header: "Character Level",
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
