import { createContext, useEffect, useState, useContext } from "react";
import { User } from "../types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext<{
  user: User | null;
  previousPage: string;
  setPreviousPage: Function;
  getCurrentUser: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    void,
    unknown
  > | null;
  register: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      name: string;
      email: string;
      password: string;
    },
    unknown
  > | null;
  login: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  > | null;
  logout: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    void,
    unknown
  > | null;
}>({
  user: null,
  previousPage: "/",
  setPreviousPage: () => {
    console.error("Pervious page not initialized");
  },
  getCurrentUser: null,
  register: null,
  login: null,
  logout: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [previousPage, setPreviousPage] = useState<string>("/");
  const [user, setUser] = useState<User | null>(null);

  // on page load, attempt to get the current user
  const getCurrentUserMutation = useMutation({
    mutationKey: ["getCurrentUser"],
    mutationFn: async () => {
      console.log("fetching current user");
      const response = await axios.get(`${BASE}/api/current_user`, {
        withCredentials: true,
      });
      console.log("/api/current_user response:", response.data);
      if (response.status === 200) {
        setUser(response.data as User);
      } else {
        setUser(null);
      }

      return response;
    },
  });

  /**
   * Will automatically log in with the same credentials after
   * successful registration.
   */
  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const response = axios.post(`${BASE}/api/register`, {
        name,
        email,
        password,
      });
      return response;
    },
    onSuccess: async (data, values) => {
      loginMutation.mutate({
        email: values.email,
        password: values.password,
      });
    },
  });

  /**
   * Will automatically redirect to the previous page if set
   * with setPreviousPage. Otherwise will automatically redirect
   * to "/"
   */
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = axios.post(
        `${BASE}/api/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response;
    },
    onSuccess: (data) => {
      console.log("Login success: ", data);
      getCurrentUserMutation.mutate();

      window.location.href = previousPage;
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      const response = axios.post(
        `${BASE}/api/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response;
    },
    onSuccess: () => {
      setUser(null);
    },
  });

  useEffect(() => {
    getCurrentUserMutation.mutate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        previousPage,
        setPreviousPage,
        getCurrentUser: getCurrentUserMutation,
        register: registerMutation,
        login: loginMutation,
        logout: logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
