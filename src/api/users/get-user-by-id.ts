import { getSession } from "@/utils/session";
import type { IUser } from "../types/user";

export async function getUserById(id: string): Promise<IUser> {
	const session = await getSession();
	const response = await fetch(`http://localhost:3333/users/${id}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${session.token}`,
		},
	});
	const { user } = await response.json();
	return user;
}
