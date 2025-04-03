"use server";

import { revalidatePath } from "next/cache";
const URL_API = process.env.NEXT_PUBLIC_API_URL;
export default async function toggleLikeAction(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	_: any,
	formData: FormData,
) {
	try {
		const { token, postId } = Object.fromEntries(formData);
		const response = await fetch(`${URL_API}/like/posts/${postId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			revalidatePath("/app/posts");
			return response.json();
		}
		return null;
	} catch (error) {
		return console.error("Erro ao curtir post:", error);
	}
}
