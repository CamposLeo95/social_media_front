import "server-only";
import { getUserById } from "@/api/users/get-user-by-id";
import { getIronSession } from "iron-session";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export type User = {
	name: string;
};
const secret = "asioluh1324h3kljh21i3g12ii4hg12h3421";
const ttl = 60 * 60 * 24; // 24 hours
export async function getSession() {
	const cookieStore = await cookies();
	return getIronSession<{ token: string }>(cookieStore, {
		password: secret,
		cookieName: "auth",
		ttl,
		cookieOptions: {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: (ttl === 0 ? 2232134231 : ttl) - 60,
			path: "/",
		},
	});
}

export async function saveSession(token: string) {
	const session = await getSession();
	session.token = token;
	await session.save();
}

export function destroySession() {}

export async function getUserData() {
	const token = await getSession().then((data) => data.token);
	const userId = jwtDecode<{ userId: number }>(token)?.userId;
	const user = await getUserById(Number(userId) || 1);

	const mapUser = {
		...user,
		id: user.id,
		createdAt: user.createdAt,
		upadatedAt: user.updatedAt,
	};

	return mapUser;
}
