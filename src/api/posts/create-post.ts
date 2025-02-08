"use server";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
const URL_API = process.env.NEXT_PUBLIC_API_URL;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const createPost = async (_prevState: any, formData: FormData) => {
	const session = await getSession();

	console.log("formData", formData);

	const response = await fetch(`${URL_API}/posts`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${session.token}`,
		},
		body: formData,
	});

	console.log("session", session.token);

	if (response.ok) {
		redirect("/app/posts");
	}
	return console.error("Erro ao criar post:", await response);
};
