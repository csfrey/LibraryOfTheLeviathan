import { useFormik } from "formik";
import AppLogo from "../assets/AppLogo";
import { useAuth } from "../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DefaultLoader from "@/components/Loader";

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { user, authError, previousPage, register } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setSubmitted(true);
      register?.mutate(values);
    },
  });

  if (user) {
    navigate(previousPage);
  }

  return (
    <div className="flex justify-center">
      {submitted && !authError ? (
        <DefaultLoader />
      ) : (
        <div className="bg-white w-[500px] rounded shadow p-4">
          <div className="flex flex-col items-center mb-4">
            <AppLogo />
            <div className="font-brand text-2 xl">Register</div>
            {authError ? <div className="text-red-500">{authError}</div> : null}
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-brand">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border-2 border-gray-200 rounded p-1"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
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
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="border py-2 px-4 rounded shadow hover:shadow-md"
              >
                Submit
              </button>
              <Link to="/login" className="font-brand text-sm">
                Already registered?
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
