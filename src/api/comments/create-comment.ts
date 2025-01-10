import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

export async function createComment(postId: number, formData: FormData) {
	"use server";

	const session = await getSession();

	const { content } = Object.fromEntries(formData.entries());
	console.log(content);

	const response = await fetch(
		`http://localhost:3333/posts/${postId}/comments`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${session.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ content }),
		},
	);

	if (response.ok) {
		redirect(`/${postId}/comment`);
	}
}
