import type { IUser } from "@/api/types/user";

export type IUserMapper = {
	id: string;
	name: string;
	email: string;
	admin: boolean;
	image_perfil: string;
	image_cover: string;
	createdAt: string;
	updatedAt: string;
	password: string;
};

export const userMapper = (data: IUser): Promise<IUserMapper> => {
	return Promise.resolve({
		id: data?.id,
		name: data?.name,
		email: data?.email,
		admin: data?.admin,
		image_perfil: data?.image_perfil,
		image_cover: data?.image_cover,
		createdAt: data?.createdAt,
		updatedAt: data?.updatedAt,
		password: data?.password,
	});
};
