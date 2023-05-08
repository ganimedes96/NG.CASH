import Image from "next/image";
import CheckImg from "../assets/icon-check.svg";
import { Player } from "@lottiefiles/react-lottie-player";
import cash from "../assets/payments.json";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Head from "next/head";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { signIn, error } = useContext(AuthContext);

  const handleSignIn = async (data: any) => {
    await signIn(data);
  };

  return (
    <>
    <Head>
      <title>NG.CASH - Home</title>
    </Head>
    <div className="max-w-[1124px] w-full h-screen mx-auto grid grid-cols-2 justify-between items-center gap-28">
      <main>
        <h2 className="font-light text-4xl text-gray-100">NG.CASH</h2>
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight ">
          A carteira digital que Está revolucionado a nova geração
        </h1>
        <Player
          autoplay
          loop
          src={cash}
          style={{ height: "250px", width: "350px" }}
        />
        <div className="mt-10 pt-10  border-t border-gray-400 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6 ">
            <Image src={CheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+5000</span>
              <span>Contas criadas</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-400" />
          <div className="flex items-center gap-6 ">
            <Image src={CheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+12000</span>
                <span>Transferências</span>
            </div>
          </div>
        </div>
      </main>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex-col w-96 items-center justify-between"
      >
        {" "}
        <h2 className="text-gray-200 font-semibold text-3xl mb-8 text-center">
          Login
        </h2>
        <input
          {...register("username")}
          className="w-full p-4 mb-4 rounded bg-gray-800 border border-gray-400 text-sm text-gray-100 placeholder:text-gray-300"
          type="text"
          required
            placeholder="Digite seu nome de usuário"
        />
        <input
          {...register("password")}
          className="w-full p-4  rounded bg-gray-800 border border-gray-400 text-sm text-gray-100 placeholder:text-gray-300"
          type="text"
          required
          placeholder="Digite sua senha"
        />
        {error && (
          <p className="text-red-600 mt-1">Usuário ou Senha Inválidos</p>
        )}
        <button
          className="bg-purple-500 w-full mt-8 px-6 py-4 rounded text-gray-200 font-bold text-sm  uppercase hover:bg-purple-300"
          type="submit"
        >
          Entrar
        </button>
        <Link href="/register" className="text-gray-200 text-center mt-2">
            <p className="mt-4">Ainda não tem conta? <strong className="text-purple-300">Criar conta!</strong>  </p>
        </Link>
      </form>
    </div>
    </>
  );
}

