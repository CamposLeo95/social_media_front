"use server";

import { getSession } from "@/utils/session";
import type { IComment } from "../types/comment";
const URL_API = process.env.NEXT_PUBLIC_API_URL;
export async function getCommentByPost(
	id_post: number,
): Promise<{ message: string; data?: IComment[] }> {
	try {
		const session = await getSession();
		const response = await fetch(`${URL_API}/posts/${id_post}/comments`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${session.token}`,
			},
		});

		if (!response.ok) {
			return response.json();
		}
		const data = await response.json();

		return data;
	} catch (error) {
		return { message: "Erro ao buscar comentários" };
	}
}
