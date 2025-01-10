import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
	"use server";

	const session = await getSession();

	const response = await fetch("http://localhost:3333/posts", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${session.token}`,
		},
		body: formData,
	});

	if (response.ok) {
		redirect("/");
	} else {
		console.error("Erro ao criar post:", await response.text());
	}
};
