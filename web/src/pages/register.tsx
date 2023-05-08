import Image from "next/image";
import CheckImg from "../assets/icon-check.svg";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { createUser, error } = useContext(AuthContext);

  const handleCreateUser = async (data: any) => {
    await createUser(data);
  };

  return (
    <>
    <Head>
      <title>NG.CASH - Register</title>
    </Head>
    <div className="max-w-[1124px] w-full h-screen mx-auto grid grid-cols-2 justify-between items-center gap-28">
      <main>
        <Link href="/">
          <h2 className="font-light text-4xl text-gray-100">NG.CASH</h2>
        </Link>
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight ">
          Faca parte da carteira digital que esta revolucionado a nova geração
        </h1>
        <div className="mt-10 pt-10  border-t border-gray-400 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6 ">
            <Image src={CheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+5000</span>
              <span>Contas criatas</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-400" />
          <div className="flex items-center gap-6 ">
            <Image src={CheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+12000</span>
              <span>Transferencias</span>
            </div>
          </div>
        </div>
      </main>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex-col w-96 items-center justify-between"
      >
        {" "}
        <h2 className="text-gray-200 font-semibold text-3xl mb-8 text-center">
          Criar conta
        </h2>
        <input
          {...register("username")}
          className="w-full p-4 mb-4 rounded bg-gray-800 border border-gray-400 text-sm text-gray-100 placeholder:text-gray-300"
          type="text"
          required
          placeholder="Digite seu username"
        />
        <input
          {...register("password")}
          className="w-full p-4  rounded bg-gray-800 border border-gray-400 text-sm text-gray-100 placeholder:text-gray-300"
          type="text"
          required
          placeholder="Digite seu password"
        />
        {error && <p className="text-red-600 mt-1">{error}</p>}
        <button
          className="bg-purple-500 w-full mt-8 px-6 py-4 rounded text-gray-200 font-bold text-sm  uppercase hover:bg-purple-300"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
    </>
  );
}
