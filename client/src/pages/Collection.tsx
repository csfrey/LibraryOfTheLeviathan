import NavTable from "@/components/NavTable";
import AdventuresTable from "@/components/table/AdventuresTable";
import { API_BASE } from "@/constants";
import { Adventure } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const Collection = () => {
  const { name } = useParams();
  const query = useQuery({
    queryKey: ["collection", name],
    queryFn: async () => {
      const result = await axios.get(`${API_BASE}/api/collection/${name}`);
      return result.data;
    },
  });

  function getCollectionTable() {
    switch (name) {
      case "adventures":
        return (
          <AdventuresTable
            isFetching={query.isFetching}
            data={(query.data ?? []) as Adventure[]}
          />
        );

      default:
        return <div>Collection not found</div>;
    }
  }

  return (
    <div className="flex justify-center gap-2">
      <div>
        <NavTable />
      </div>
      <div className="w-[1100px] bg-white rounded p-4">
        {getCollectionTable()}
      </div>
    </div>
  );
};

export default Collection;
