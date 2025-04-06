"use client";
import { registerAction } from "@/api/register/register";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { BiImage } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";

export default function RegisterForm() {
	const [state, formAction, isPending] = useActionState(registerAction, null);
	const [prevImg, setPrevImg] = useState<string>("");

	useEffect(() => {
		if (state?.success) {
			redirect("/login");
		}
	}, [state]);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleImage = (e: any) => {
		const file = e.target.files[0];
		setPrevImg(URL.createObjectURL(file));
	};

	return (
		<>
			<Form className="p-3 flex flex-col w-full gap-8" action={formAction}>
				<h1 className="text-3xl lg:text-5xl text-center font-bold text-blue-500 ">
					Social Share!
				</h1>
				{state?.success === false ? (
					<div className="bg-red-400  p-1 text-white rounded-md w-full border-red-600 border-[1px] text-center flex gap-2 items-center justify-center ">
						<FiAlertTriangle className="text-2xl" />
						<span>{state?.message}</span>
					</div>
				) : (
					<h3 className="text-zinc-400 text-center">Cadastre com sua Conta!</h3>
				)}

				<div className="flex flex-col gap-1">
					<input
						name="name"
						type="text"
						className="border border-1 p-2 rounded-md bg-zinc-800 outline-none border-none"
						placeholder="Nome"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<input
						name="email"
						type="email"
						className="border border-1 p-2 rounded-md bg-zinc-800 outline-none border-none"
						placeholder="Email"
					/>
				</div>
				<div className="flex flex-col gap-1 rounded-md">
					<input
						name="password"
						type="password"
						className="border border-1 p-2 rounded-md bg-zinc-800 outline-none border-none"
						placeholder="Senha"
					/>
				</div>
				<div className="flex flex-col gap-1 rounded-md">
					<input
						name="confirm_password"
						type="password"
						className="border border-1 p-2 rounded-md bg-zinc-800 outline-none border-none"
						placeholder="Confirmar Senha"
					/>
				</div>
				<div className=" flex items-center justify-between px-2 ">
					<div className="relative">
						<label
							htmlFor="perfil"
							className={` ${isPending ? " bg-zinc-500 text-zinc-800 " : "cursor-pointer bg-blue-600   text-white hover:bg-blue-700 "} transition-colors gap-2 rounded-md flex items-center justify-center p-1 w-32`}
						>
							<BiImage /> <span>Imagem</span>
						</label>
						<input
							disabled={isPending}
							type="file"
							name="perfil"
							id="perfil"
							className="hidden"
							onChange={(e) => handleImage(e)}
						/>
					</div>
					{prevImg && (
						<div className="flex justify-center rounded-md overflow-hidden">
							<div className="rounded-md w-full md:w-[100px] overflow-hidden border-y-[1px] border-zinc-600">
								<img src={prevImg} alt="preview" className="w-full   " />
							</div>
						</div>
					)}
				</div>
				<button
					className={`bg-blue-600 p-1 w-20 rounded-md flex items-center justify-center ${isPending ? "bg-opacity-50" : "hover:bg-blue-700"} transition-colors w-full`}
					type="submit"
					disabled={isPending}
				>
					{isPending ? (
						<span className="animate-spin p-2">
							<LuLoader />
						</span>
					) : (
						<span className="p-1">Entrar</span>
					)}
				</button>
				<span className="text-zinc-500 text-center">
					Já possui uma conta?{" "}
					<Link href={"/login"} className="text-zinc-200">
						Entrar!
					</Link>
				</span>
			</Form>
		</>
	);
}
