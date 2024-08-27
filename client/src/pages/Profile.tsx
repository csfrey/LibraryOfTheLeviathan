import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { API_BASE } from "@/constants";
import axios from "axios";

const Profile = () => {
  const [passwordMessageState, setPasswordMessageState] = useState("");

  const navigate = useNavigate();
  const { user, getCurrentUser } = useAuth();

  const changePassword = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const result = await axios.put(
        `${API_BASE}/api/user/change_password`,
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      return result;
    },
    onSuccess: () => {
      setPasswordMessageState("Password updated!");
    },
  });

  const changePasswordForm = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: (values) => {
      changePassword.mutate(values);
      changePasswordForm.resetForm();
    },
  });

  if (!getCurrentUser?.isPending && !user) {
    navigate("/");
  }

  const passwordMessage = changePassword.isPending
    ? "Updating..."
    : changePassword.isError
    ? "Password is incorrect"
    : passwordMessageState;

  return (
    <div className="flex justify-center">
      <div className="bg-white w-[800px] shadow rounded profile p-4">
        <h2 className="text-2xl font-brand">
          Hi, <i>{user?.name}</i>
        </h2>
        <div className="border border-grey-50 my-2"></div>
        <h3 className="font-brand text-xl mb-2">Password Update</h3>
        <form
          onSubmit={changePasswordForm.handleSubmit}
          className="flex flex-col gap-4 px-4"
        >
          <div className="flex flex-col">
            <label htmlFor="password" className="font-brand">
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              className="border-2 border-gray-200 rounded p-1"
              onChange={changePasswordForm.handleChange}
              value={changePasswordForm.values.currentPassword}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-brand">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className="border-2 border-gray-200 rounded p-1"
              onChange={changePasswordForm.handleChange}
              value={changePasswordForm.values.newPassword}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-brand">
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              className="border-2 border-gray-200 rounded p-1"
              onChange={changePasswordForm.handleChange}
              value={changePasswordForm.values.confirmNewPassword}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="border py-2 px-4 rounded shadow hover:shadow-md"
            >
              Save
            </button>
            <div className="text-red-500">{passwordMessage}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
