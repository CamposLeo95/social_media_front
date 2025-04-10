import Form from "next/form";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import type UseFormLogin from "./useForm-login";

export type ILoginFormView = ReturnType<typeof UseFormLogin>;

export default function LoginFormView(props: ILoginFormView) {
	return (
		<form className="p-3 flex flex-col w-full gap-8" action={props.formAction}>
			{!props.state?.isSuccess ? (
				<div className="bg-red-400  p-1 text-white rounded-md w-full border-red-600 border-[1px] text-center flex gap-2 items-center justify-center ">
					<FiAlertTriangle className="text-2xl" />
					<span>{props.state?.message}</span>
				</div>
			) : (
				<h3 className="text-zinc-400 text-center">Entre com sua Conta!</h3>
			)}

			<div className="flex flex-col gap-1">
				<input
					aria-label="email"
					name="email"
					type="text"
					className="border border-1 p-2 rounded-md bg-zinc-800 outline-none border-none"
					placeholder="login"
				/>
			</div>
			<div className="flex flex-col gap-1 rounded-md">
				<input
					aria-label="password"
					name="password"
					type="password"
					className="border border-1 p-2 rounded-md bg-zinc-800 outline-none border-none"
					placeholder="Senha"
				/>
			</div>

			<button
				className={`bg-blue-600 p-1 w-20 rounded-md flex items-center justify-center ${props.isPending ? "bg-opacity-50" : "hover:bg-blue-700"} transition-colors w-full`}
				type="submit"
				disabled={props.isPending}
			>
				{props.isPending ? (
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
		</form>
	);
}
