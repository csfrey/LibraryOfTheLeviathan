import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useFormik } from "formik";

const Profile = () => {
  const navigate = useNavigate();
  const { user, getCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  if (!getCurrentUser?.isPending && !user) {
    navigate("/not-authorized");
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white w-[800px] rounded profile p-4">
        <h2 className="text-2xl font-brand">
          Hi, <i>{user?.name}</i>
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="password" className="font-brand">
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              className="border-2 border-gray-200 rounded p-1"
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
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
              onChange={formik.handleChange}
              value={formik.values.newPassword}
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
              onChange={formik.handleChange}
              value={formik.values.confirmNewPassword}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="border py-2 px-4 rounded shadow hover:shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
