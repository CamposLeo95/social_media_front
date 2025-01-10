import { saveSession } from "@/utils/session";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
	"use server";
	const { email, senha } = Object.fromEntries(formData);

	const response = await fetch("http://localhost:3333/login", {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ email, senha }),
	});

	if (response.ok) {
		const { token } = await response.json();
		await saveSession(token);
		redirect("/");
	}
}
