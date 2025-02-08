"use server";

import { redirect } from "next/navigation";

const URL_API = process.env.NEXT_PUBLIC_API_URL;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function deletePost(_prevstate: any, formData: FormData) {
	const { postId, token } = Object.fromEntries(formData);
	const response = await fetch(`${URL_API}/posts/${postId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		return console.error("Erro ao deletar post:", await response.text());
	}

	redirect("/app/posts");
}
