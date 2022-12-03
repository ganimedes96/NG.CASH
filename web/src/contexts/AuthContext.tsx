import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { AxiosError } from "axios";
import { IAccount } from "../interfaces/IUser";
import { ITransactionInfo } from "../interfaces/ITransaction";

interface childrenProps {
  children: ReactNode;
}

interface signInData {
  username: string;
  password: string;
}

interface sendTransaction {
  recipient: string;
  value: number;
}

type AuthContextType = {
  user: IAccount | null;
  account: IAccount | null;
  signIn: (data: signInData) => Promise<void>;
  createUser: (data: signInData) => Promise<void>;
  newTransaction: (data: sendTransaction) => Promise<void>;

  error: string;
  transactions: ITransactionInfo[];
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: childrenProps) {
  const [user, setUser] = useState<IAccount | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);
  const [transactions, setTransactions] = useState<ITransactionInfo[]>([]);
  const [error, setError] = useState("");

  const createUser = async ({ password, username }: signInData) => {
    try {
      await api.post("/users", {
        username,
        password,
      });
      Router.push("/");
    } catch (err: AxiosError | any) {
      if (err.response.data.message === "User already exists!") {
        setError("Usuario ja existente!");
      }
      if (err.response.data.message === "Invalid username") {
        setError("Username invalido");
      }
      if (
        err.response.data.message ===
        "The password must contain at least 8 characters in uppercase, 1 number and 1 special character!"
      ) {
        setError("Password invalido");
      }
    }
  };

  const newTransaction = async ({ recipient, value }: sendTransaction) => {
    try {
      const { "ngcash-token": token } = parseCookies();

      const response = await api.post(
        "/transactions",
        {
          recipient,
          value: Number(value),
        },
        {
          headers: {
            Authorization: token as string,
          },
        }
      );
    } catch (err: AxiosError | any) {
      console.log(err.response.data.message);

      if (err.response.data.message === "Customer not found") {
        setError("Cliente nao encontrado");
      }

      if (
        err.response.data.message === "you cannot make a transfer to yourself"
      ) {
        setError("você não pode fazer uma transferência para si mesmo");
      } else if (err.response.data.message === "insufficient funds") {
        setError("Saldo insuficiente");
      }
    }
  };

  const getTransactions = async () => {
    try {
      const { "ngcash-token": token } = parseCookies();

      const response = await api.get("/transactions/filter", {
        headers: {
          Authorization: token as string,
        },
      });
      setTransactions(response.data);
    } catch (err: AxiosError | any) {
      console.log(err);
    }
  };

  const signIn = async ({ username, password }: signInData) => {
    try {
      const userData = await api.post("/login", {
        username,
        password,
      });

      const { token } = userData.data;

      setCookie(undefined, "ngcash-token", token, {
        maxAge: 60 * 60 * 24, // 1 dia
      });

      setUser(token);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err: AxiosError | any) {
      if (err.response as AxiosError) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  const getUserAccount = async () => {
    try {
      const { "ngcash-token": token } = parseCookies();

      if (token) {
        const response = await api.get("/users/account", {
          headers: {
            Authorization: token as string,
          },
        });
        setAccount(response.data);
      }
    } catch (err: AxiosError | any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserAccount();
    getTransactions();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        error,
        transactions,
        account,
        createUser,
        newTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
