"use server";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createComment(_prevState: any, formData: FormData) {
	const URL_API = process.env.NEXT_PUBLIC_API_URL;
	const session = await getSession();

	const { content, postId } = Object.fromEntries(formData.entries());

	const response = await fetch(`${URL_API}/posts/${postId}/comments`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${session.token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ content }),
	});

	if (response.ok) {
		redirect(`/app/posts/${postId}/comment`);
	}
}
