import { getSession } from "@/utils/session";
import type { IPost } from "../types/post";

export async function getPosts(): Promise<IPost[]> {
	"use server";

	const session = await getSession();
	const response = await fetch("http://localhost:3333/posts", {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${session.token}`,
		},
	});

	return response.json();
}
