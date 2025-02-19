"use server";

import { getSession } from "@/utils/session";
import type { IPost } from "../types/post";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function getPosts(): Promise<IPost[]> {
	const session = await getSession();

	const response = await fetch(`${URL_API}/posts`, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${session.token}`,
		},
	});

	const { data, message } = await response.json();

	if (!response.ok) {
		return [];
	}

	return data;
}
