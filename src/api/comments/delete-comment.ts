"use server";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function deleteComment(_prevState: any, formData: FormData) {
	const URL_API = process.env.NEXT_PUBLIC_API_URL;
	const session = await getSession();
	const { postId, commentId } = Object.fromEntries(formData.entries());

	const response = await fetch(`${URL_API}/comments/${commentId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${session.token}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		redirect(`/app/posts/${postId}/comment`);
	}
}
