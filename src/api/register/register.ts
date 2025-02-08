"use server";

const URL_API = process.env.NEXT_PUBLIC_API_URL;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function registerAction(_prevState: any, formData: FormData) {
	try {
		const { name, email, password, confirm_password } =
			Object.fromEntries(formData);

		if (!name || !email || !password) {
			return {
				message: "Preencha todos os campos!",
				success: false,
			};
		}

		if (password !== confirm_password) {
			return {
				message: "As passwords não coincidem!",
				success: false,
			};
		}

		console.log(formData);

		const response = await fetch(`${URL_API}/users`, {
			method: "POST",
			body: formData,
		});

		const data = await response.json();
		if (response.ok) {
			return {
				success: true,
			};
		}
	} catch (error) {
		return {
			success: false,
			message: "Erro ao realizar cadastro.",
		};
	}
}
