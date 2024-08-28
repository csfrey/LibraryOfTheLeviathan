import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/config/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE } from "@/config/constants";

type AuthContextT = {
  user: User | null; // null user means not logged in
  isPending: boolean; // true if any of the mutations are pending
  errorMessage: string | null; // null means no error message
  previousPage: string; // to store the last page the user was on before auth
  setPreviousPage: Function;
  register: Function; // callable with (name, email, password)
  login: Function; // callable with (email, password)
  logout: Function; // callable
};

const AuthContext = createContext<AuthContextT | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("No AuthContext.Provider found when calling useAuth");
  }
  return authContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // STATE VARIABLES
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState("/");

  // MUTATIONS
  const currentUserMutation = useMutation({
    mutationKey: ["CurrentUser"],
    mutationFn: async () => {
      setIsPending(true);
      const response = await axios.get(`${API_BASE}/api/user/current`, {
        withCredentials: true,
      });
      return response.data;
    },
    onMutate: () => {
      setIsPending(true);
    },
    onSuccess: (data: User) => {
      setUser(data);
    },
    onError: () => {
      setUser(null);
    },
    onSettled: () => {
      setIsPending(false);
    },
  });

  const registerMutation = useMutation({
    mutationKey: ["Register"],
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const result = await axios.post(`${API_BASE}/api/user/register`, {
        name,
        email,
        password,
      });
      return result.data;
    },
    onMutate: () => {
      setIsPending(true);
    },
    onSuccess: async (_, { email, password }) => {
      setErrorMessage(null);
      await loginMutation.mutate({
        email,
        password,
      });
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["Login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      setIsPending(true);
      const response = await axios.post(
        `${API_BASE}/api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onMutate: () => {
      setIsPending(true);
      setErrorMessage(null);
    },
    onSuccess: async () => {
      setErrorMessage(null);
      await currentUserMutation.mutate();
      window.location.href = previousPage;
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data);
      setUser(null);
    },
    onSettled: () => {
      setIsPending(false);
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["Logout"],
    mutationFn: async () => {
      // TODO: change to post if this breaks
      const response = await axios.get(`${API_BASE}/api/user/logout`, {
        withCredentials: true,
      });
      return response.data;
    },
    onMutate: () => {
      setIsPending(true);
    },
    onSuccess: () => {
      setErrorMessage(null);
      setUser(null);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data);
    },
    onSettled: () => {
      setIsPending(false);
    },
  });

  // EFFECTS
  useEffect(() => {
    currentUserMutation.mutate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isPending,
        errorMessage,
        previousPage,
        setPreviousPage,
        register: registerMutation.mutate,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
