import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { parseCookies, destroyCookie } from "nookies";
import { useContext } from "react";
import { Summary } from "../components/Summary";
import { TableTRansactions } from "../components/TableTransactions";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { account } = useContext(AuthContext);

  const handleSingOut = () => {
    destroyCookie(null, "ngcash-token");
    Router.push("/");
  };

  return (
    <>
    <Head>
      <title>NG.CASH - Dashboard</title>
    </Head>
      <header className="w-full max-w-[1120px] mx-auto flex items-center justify-between p-9">
        <Link href="/">
          <h1 className="font-light text-4xl text-gray-100">NG.CASH</h1>
        </Link>
        <div className="flex items-center justify-center gap-4 text-gray-200">
          <span className="font-semibold text-md">
            Ola,{" "}
            <strong className="text-purple-300">{account?.username}!</strong>
          </span>
          <button
            onClick={handleSingOut}
            className="bg-purple-500 text-gray-200 px-4 py-2 rounded font-medium"
          >
            Sair
          </button>
        </div>
      </header>

      <section>
        <Summary />
      </section>
      <TableTRansactions />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "ngcash-token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
