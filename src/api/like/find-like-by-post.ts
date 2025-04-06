"use server";

import { checkSession } from "@/utils/session";
import type { Like } from "../types/like";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function findLikeByPost(
	id_post: number,
): Promise<{ message: string; data: Like[] }> {
	try {
		const { token } = await checkSession();
		const response = await fetch(`${URL_API}/like/posts/${id_post}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json",
			},
		});

		const data = await response.json();

		return { message: "likes", data };
	} catch (error) {
		return { message: "Erro ao buscar curtidas", data: [] };
	}
}
