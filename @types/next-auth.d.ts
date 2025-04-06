import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		accessToken?: string;
		user: {
			id: number;
			name?: string;
			email?: string;
		};
	}

	interface User {
		id: number;
		token: string;
		name?: string;
		email?: string;
	}

	interface JWT {
		accessToken?: string;
		id?: number;
	}
}
