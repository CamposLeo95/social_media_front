"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogoutAction() {
	const coockieStore = await cookies();
	await coockieStore.delete("auth.token");
	redirect("/login");
}
