import { collectionsConfig } from "./config/collections";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Link, useLocation } from "react-router-dom";

const NavTable = () => {
  const location = useLocation();
  return (
    <nav className="mr-4 font-brand">
      <div className="max-h-min rounded bg-white shadow">
        <Table className="">
          <TableHeader className="border-b border-gray-400">
            <TableHead className="text-xl">Collections</TableHead>
          </TableHeader>
          <TableBody>
            {collectionsConfig.map((c) => {
              const loc = `/collection/${c.name}`;
              return (
                <TableRow className="" key={c.name}>
                  <TableCell className="p-2">
                    <Link to={loc}>
                      <div className="flex items-center gap-2">
                        {c.icon("size-5")}
                        {c.display}
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </nav>
  );
};

export default NavTable;
