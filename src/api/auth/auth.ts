"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type IAuthAction = {
	isSuccess: boolean;
	message: string;
};

export async function authAction(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	_prevState: any,
	formData: FormData,
): Promise<IAuthAction | null> {
	const URL_API = process.env.NEXT_PUBLIC_API_URL;
	const { email, password } = Object.fromEntries(formData.entries());

	if (!email || !password) {
		return {
			message: "Insira o email e a senha!",
			isSuccess: false,
		};
	}

	const res = await fetch(`${URL_API}/auth`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const { data } = await res.json();

	if (data?.token) {
		const browserCookies = await cookies();
		browserCookies.set("auth.token", JSON.stringify(data?.token));

		redirect("/app/posts");
	}

	return {
		message: "Erro ao efetuar login!",
		isSuccess: false,
	};
}
