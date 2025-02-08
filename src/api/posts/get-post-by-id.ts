"use server";
import { getSession } from "@/utils/session";
import type { IPost } from "../types/post";
const URL_API = process.env.NEXT_PUBLIC_API_URL;
export async function getPostById(
	postId: string | undefined,
): Promise<{ message: string; data: IPost }> {
	const session = await getSession();

	const response = await fetch(`${URL_API}/posts/${postId}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${session.token}`,
		},
	});

	const data = response.json();

	return data;
}
