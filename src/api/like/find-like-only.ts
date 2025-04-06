"use server";

import { checkSession } from "@/utils/session";

const URL_API = process.env.NEXT_PUBLIC_API_URL;
export async function findLikeOnly(id_post: number, id_user: number) {
	try {
		const { token } = await checkSession();
		const response = await fetch(
			`${URL_API}/like/posts/${id_post}/user/${id_user}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			},
		);
		if (!response.ok) {
			return null;
		}
		const data = await response.json();

		return data;
	} catch (error) {
		return console.error("Erro ao buscar curtidas:", error);
	}
}
