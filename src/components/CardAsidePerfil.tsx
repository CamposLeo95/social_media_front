import { getPosts } from "@/api/posts/get-posts";
import { getUserById } from "@/api/users/get-user-by-id";
import { getSession } from "@/utils/session";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import photo from "../assets/meu_pet.jpg";
import Card from "./Card";

export default async function CardAsidePerfil() {
	const token = await getSession().then((data) => data.token);
	const userId = jwtDecode<{ userId: number }>(token)?.userId;

	const user = await getUserById(String(userId) || "1");

	const posts = await getPosts();

	const Iposts = posts.filter((post) => post.userId === userId);

	return (
		<>
			<Card className=" min-w-[300px] flex flex-col gap-2 items-center relative overflow-hidden">
				<Image
					src={photo}
					alt="imagem"
					className="w-full h-24 top-0 object-cover absolute"
				/>
				<div className="w-20 h-20 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md z-20 mt-10 border-4 border-zinc-900">
					<Image
						src={photo}
						alt="imagem"
						className="w-full h-full object-cover"
					/>
				</div>
				<span className="font-semibold text-xl capitalize">{user?.name}</span>
				<span className="text-zinc-400 italic">{user?.email}</span>

				<div className="flex w-full flex-col items-center">
					<span className="font-semibold">{Iposts?.length}</span>
					<span className="text-zinc-400 italic">Posts</span>
					<Link
						href="/"
						className=" bg-blue-600 text-white p-2 rounded-md w-full text-center"
					>
						Meu perfil
					</Link>
				</div>
			</Card>
		</>
	);
}
