import type { IUser } from "./user";

export type IComment = {
	id: number;
	userId: number;
	postId: number;
	content: string;
	createAt: string;
	user: IUser;
};
