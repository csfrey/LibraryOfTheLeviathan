import { API_BASE } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircleLoader } from "react-spinners";
import axios from "axios";
import { useState } from "react";

const UserRow = ({ user, onError }: { user: any; onError: Function }) => {
  const [notSaved, setNotSaved] = useState(false);
  const [role, setRole] = useState(user.role);
  const updateUser = useMutation({
    mutationKey: ["updateUser", user.email],
    mutationFn: async ({ role }: { role: string }) => {
      const result = await axios.put(
        `${API_BASE}/api/user/${user._id}`,
        {
          role,
        },
        {
          withCredentials: true,
        }
      );

      return result.data;
    },
    onSuccess: () => setNotSaved(false),
    onError: () => onError(`Failed to update user with ID ${user._id}`),
  });

  const deleteUser = useMutation({
    mutationKey: ["deleteUser", user.email],
    mutationFn: async () => {
      const result = await axios.delete(`${API_BASE}/api/user/${user._id}`, {
        withCredentials: true,
      });
      return result.data;
    },
    onSuccess: () => window.location.reload(),
    onError: () => onError(`Failed to delete user with ID ${user._id}`),
  });

  function handleRoleChange(e: any) {
    setNotSaved(true);
    setRole(e.target.value);
  }

  return (
    <tr className="odd:bg-gray-100 even:bg-gray-200">
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          <select
            value={role}
            defaultValue={"viewer"}
            className="p-2 rounded"
            onChange={handleRoleChange}
          >
            <option value="viewer">viewer</option>
            <option value="editor">editor</option>
            <option value="admin">admin</option>
          </select>
          <div className=" w-2 h-2">
            {notSaved ? (
              <div className="w-full h-full rounded-full bg-gray-400"></div>
            ) : null}
          </div>
        </div>
      </td>
      <td className="flex items-center gap-4 p-2">
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700"
          onClick={() =>
            updateUser.mutate({
              role,
            })
          }
        >
          SAVE
        </button>
        <button
          type="button"
          className="text-red-500 hover:text-red-700"
          onClick={() => deleteUser.mutate()}
        >
          DELETE
        </button>
        <div className="w-4 h-4">
          {updateUser.isPending ? <CircleLoader size="10" /> : null}
        </div>
      </td>
    </tr>
  );
};

const AdminConsole = () => {
  const [errorMessage, setErrorMessage] = useState("");
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
      <div className="flex justify-center w-4">
        <CircleLoader size="10px" />
      </div>
    );
  }

  return (
    <div>
      <div className="text-xl text-red-500">{errorMessage}</div>
      <div className="bg-white p-4 mx-auto rounded w-[800px]">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-200 uppercase">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {usersQuery?.data?.map((user: any) => (
              <UserRow key={user.email} user={user} onError={setErrorMessage} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminConsole;
