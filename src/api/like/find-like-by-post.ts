"use server";

import type { Like } from "../types/like";
const URL_API = process.env.NEXT_PUBLIC_API_URL;
export async function findLikeByPost(
	id_post: number,
): Promise<{ message: string; data: Like[] }> {
	try {
		const response = await fetch(`${URL_API}/like/posts/${id_post}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		});

		const data = await response.json();
		return data;
	} catch (error) {
		return { message: "Erro ao buscar curtidas", data: [] };
	}
}
