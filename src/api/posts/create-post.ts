"use server";

import { checkSession } from "@/utils/session";
import { redirect } from "next/navigation";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const createPost = async (_prevState: any, formData: FormData) => {
	const session = await checkSession();

	const res = await fetch(`${URL_API}/posts`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${session.token}`,
		},
		body: formData,
	});

	if (res.ok) {
		redirect("/login");
	}
};
