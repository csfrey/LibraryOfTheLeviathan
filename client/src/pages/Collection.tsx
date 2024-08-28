import { API_BASE } from "@/components/config/constants";
import NavTable from "@/components/NavTable";

import {
  Adventure,
  Background,
  Class,
  Feat,
  MagicItem,
  Race,
  Spell,
  Subclass,
} from "@/components/config/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { collectionsConfig } from "@/components/config/collections";
import { DomainTable } from "@/components/table/DomainTable";
import { ColumnDef } from "@tanstack/react-table";

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

  // this is so dumb but it's more efficient than writing 10
  // separate components that do basically the same thing
  let data;
  switch (name) {
    case "adventures":
      data = (query?.data ?? []) as Adventure[];
      break;

    case "backgrounds":
      data = (query?.data ?? []) as Background[];
      break;

    case "classes":
      data = (query?.data ?? []) as Class[];
      break;

    case "feats":
      data = (query?.data ?? []) as Feat[];
      break;

    case "magicItems":
      data = (query?.data ?? []) as MagicItem[];
      break;

    case "races":
      data = (query?.data ?? []) as Race[];
      break;

    case "retainers":
      data = (query?.data ?? []) as Background[];
      break;

    case "spells":
      data = (query?.data ?? []) as Spell[];
      break;

    case "subclasses":
      data = (query?.data ?? []) as Subclass[];
      break;

    default:
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
            data={data}
          />
        ) : (
          <div>Collection not found</div>
        )}
      </div>
    </div>
  );
};

export default Collection;
