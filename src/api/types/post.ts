import type { IComment } from "./comment";
import type { ILikes } from "./like";
import type { IUser } from "./user";

export type IPost = {
	id: string;
	id_user: number;
	content: string;
	image_url: string;
	createAt: string;
	user: IUser;
	comments: IComment[];
	likes: ILikes[];
};
