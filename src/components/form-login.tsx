"use client";

import { loginAction } from "@/api/login/login";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";

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
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					className="bg-blue-500 text-white w-full p-2 rounded-md md:mt-14"
					type="submit"
				>
					Entrar
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
