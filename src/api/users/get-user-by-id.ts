import { type IUserMapper, userMapper } from "@/mappers/user.mapper";
import { getSession } from "@/utils/session";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function getUserById(id: number): Promise<IUserMapper> {
	const session = await getSession();
	const response = await fetch(`${URL_API}/users/${id}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${session.token}`,
		},
	});
	const { data } = await response.json();

	const userMap = userMapper(data);

	return userMap;
}
