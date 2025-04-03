"use server";
import { signIn } from "@/auth";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function loginAction(_prevState: any, formdata: FormData) {
	try {
		const { email, password } = Object.fromEntries(formdata);

		await signIn("credentials", {
			email: email,
			password: password,
			redirect: false,
		});
		return {
			success: true,
		};
	} catch (e) {
		if (e.type === "CredentialsSignin") {
			return {
				success: false,
				message: "Dados de login inválidos.",
			};
		}

		return {
			success: false,
			message: "Erro ao realizar login.",
		};
	}
}
