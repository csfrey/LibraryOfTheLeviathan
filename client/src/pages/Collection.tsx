import { API_BASE } from "@/components/config/constants";
import NavTable from "@/components/NavTable";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { collectionsConfig } from "@/components/config/collections";
import { DomainTable } from "@/components/table/DomainTable";

const Collection = () => {
  const { name } = useParams();
  const query = useQuery({
    queryKey: ["collection", name],
    queryFn: async () => {
      const result = await axios.get(`${API_BASE}/api/collection/${name}`);
      return result.data;
    },
  });

  const config = collectionsConfig.find((c) => c.name === name);

  if (!config) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="flex justify-center gap-2">
      <div>
        <NavTable />
      </div>
      <div className="w-[1100px] bg-white rounded p-4">
        {config ? (
          <DomainTable
            title={config.display}
            isFetching={query.isFetching}
            columns={config.columns}
            data={query.data}
          />
        ) : (
          <div>Collection not found</div>
        )}
      </div>
    </div>
  );
};

export default Collection;
