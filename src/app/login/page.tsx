import { loginAction } from "@/api/login/login";

export default function LoginPage() {
	return (
		<form className="p-3 flex flex-col gap-3 bg-black" action={loginAction}>
			<h1>Login</h1>
			<div className="flex flex-col gap-1">
				<label htmlFor="email">Email</label>
				<input
					name="email"
					type="text"
					className="border border-1 p-2 rounded-md"
				/>
			</div>
			<div className="flex flex-col gap-1 rounded-md">
				<label htmlFor="senha">Senha</label>
				<input
					name="senha"
					type="password"
					className="border border-1 p-2 rounded-md"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-400 text-white w-full p-2 rounded-md"
			>
				Login
			</button>
		</form>
	);
}
