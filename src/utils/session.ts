// instal iron-session
import "server-only";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export type User = {
	name: string;
};
const secret = "asioluh1324h3kljh21i3g12ii4hg12h3421";
const ttl = 60 * 60 * 24 * 7; // 1 week
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

export function getUser() {}
