import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserById } from "./api/users/get-user-by-id";
import { userMapper } from "./mappers/user.mapper";
import { saveSession } from "./utils/session";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const URL_API = process.env.NEXT_PUBLIC_API_URL;

				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				const response = await fetch(`${URL_API}/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				});

				const data = await response.json();

				if (!data.token) {
					return null;
				}

				saveSession(data.token);
				const userId = await jwtDecode<{ userId: number }>(data.token)?.userId;
				const user = await getUserById(userId || 0);

				return user;
			},
		}),
	],
});
