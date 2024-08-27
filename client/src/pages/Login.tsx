import { useFormik } from "formik";
import AppLogo from "../assets/AppLogo";
import { useAuth } from "../hooks/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, previousPage, login } = useAuth();

  if (user) {
    navigate(previousPage);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login?.mutate(values);
    },
  });

  return (
    <div className="flex justify-center">
      <div className="bg-white w-[500px] rounded shadow p-4">
        <div className="flex flex-col items-center mb-4">
          <AppLogo />
          <div className="font-brand text-2 xl">Log In</div>
          {login?.isError ? (
            <div className="text-red-500">{login.error.message}</div>
          ) : null}
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-brand">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="border-2 border-gray-200 rounded p-1"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-brand">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="border-2 border-gray-200 rounded p-1"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div>
            <button
              type="submit"
              className="border py-2 px-4 rounded shadow hover:shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
