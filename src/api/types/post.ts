import type { IComment } from "./comment";
import type { ILikes } from "./like";
import type { IUser } from "./user";

export type IPost = {
	id: string;
	userId: number;
	content: string;
	image: string;
	createAt: string;
	user: IUser;
	comments: IComment[];
	likes: ILikes[];
};
