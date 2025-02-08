"use client";

import { loginAction } from "@/api/login/login";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState(loginAction, null);

	useEffect(() => {
		if (state?.success === true) {
			redirect("/app/posts");
		}
	}, [state?.success]);

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
					<h3 className="text-zinc-400 text-center">Entre com sua Conta!</h3>
				)}

				<div className="flex flex-col gap-1">
					{/* <label htmlFor="email">Email</label> */}
					<input
						name="email"
						type="text"
						className="border border-1 p-2 rounded-md bg-zinc-800 outline-none border-none"
						placeholder="Email"
					/>
				</div>
				<div className="flex flex-col gap-1 rounded-md">
					{/* <label htmlFor="senha">Senha</label> */}
					<input
						name="password"
						type="password"
						className="border border-1 p-2 rounded-md bg-zinc-800 outline-none border-none"
						placeholder="Senha"
					/>
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
					Não possui conta?{" "}
					<Link href={"/register"} className="text-zinc-200">
						Cadastre-se!
					</Link>
				</span>
			</Form>
		</>
	);
}
