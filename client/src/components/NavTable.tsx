import { collections } from "@/config/collections";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Link } from "react-router-dom";

const NavTable = () => {
  return (
    <nav className="mr-4 font-brand">
      <div className="max-h-min rounded bg-white shadow">
        <Table className="">
          <TableHeader className="border-b border-gray-400">
            <TableRow>
              <TableHead className="text-xl">Collections</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...collections].map(([name, c]) => {
              const loc = `/collection/${c.route}`;
              return (
                <TableRow className="" key={c.route}>
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
