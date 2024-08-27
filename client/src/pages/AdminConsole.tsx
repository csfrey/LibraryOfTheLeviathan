import { API_BASE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { CircleLoader } from "react-spinners";
import axios from "axios";

const AdminConsole = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const results = await axios.get(`${API_BASE}/api/users`, {
        withCredentials: true,
      });
      return results.data;
    },
  });

  if (usersQuery.isFetching) {
    return (
      <div className="flex justify-center">
        <CircleLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white p-4 mx-auto rounded w-[800px]">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-200 uppercase">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </thead>
          <tbody className="">
            {usersQuery?.data?.map((user: any) => (
              <tr className="odd:bg-white even:bg-gray-100">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-4">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    SAVE
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminConsole;
