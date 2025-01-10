import { getSession } from "@/utils/session";
import type { IPost } from "../types/post";

export async function getPostById(
	postId: string | undefined,
): Promise<IPost | null> {
	"use server";

	if (!postId) {
		return null;
	}

	const session = await getSession();

	const response = await fetch(`http://localhost:3333/posts/${postId}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${session.token}`,
		},
	});

	return response.json();
}
