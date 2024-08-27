import { createContext, useEffect, useState, useContext } from "react";
import { User } from "../types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/constants";

const AuthContext = createContext<{
  user: User | null;
  authError: string | null;
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
  authError: null,
  previousPage: "/",
  setPreviousPage: () => {
    console.error("Previous page not initialized");
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
  const [authError, setAuthError] = useState<string | null>(null);

  // on page load, attempt to get the current user
  const getCurrentUserMutation = useMutation({
    mutationKey: ["getCurrentUser"],
    mutationFn: async () => {
      const response = await axios.get(`${API_BASE}/api/user/current`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data as User);
      } else {
        setUser(null);
      }

      return response.data;
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
      const response = await axios.post(`${API_BASE}/api/user/register`, {
        name,
        email,
        password,
      });
      return response.data;
    },
    onSuccess: async (data, values) => {
      loginMutation.mutate({
        email: values.email,
        password: values.password,
      });
      setAuthError(null);
    },
    onError: (error: any) => {
      setAuthError(error.response.data);
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
        `${API_BASE}/api/user/login`,
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
    onSuccess: () => {
      getCurrentUserMutation.mutate();
      setAuthError(null);
      window.location.href = previousPage;
    },
    onError: (error: any) => {
      setAuthError(error.response.data);
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      const response = axios.post(
        `${API_BASE}/api/user/logout`,
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
        authError,
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
