import { getPosts } from "@/api/posts/get-posts";
import photo from "@/assets/meu_pet.jpg";
import MenuAside from "@/components/aside-menu";
import LogoutButton from "@/components/button-logout";
import { getUserData } from "@/utils/session";
import Image from "next/image";

export default async function CardAsidePerfil() {
	const user = await getUserData();
	const posts = await getPosts();
	const Iposts = posts.filter((post) => post.id_user === Number(user.id));

	return (
		<>
			<div className=" min-w-[300px] flex flex-col gap-2 items-center relative overflow-hidden h-[800px] bg-zinc-900 rounded-md shadow-md">
				<Image
					src={user?.image_cover || photo}
					alt="imagem"
					className="w-full h-24 top-0 object-cover absolute"
					width={300}
					height={300}
				/>
				<div className="w-20 h-24 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md z-20 mt-10 border-4 border-zinc-900">
					<Image
						src={user?.image_perfil || photo}
						alt="imagem"
						className="w-full h-full object-cover"
						width={300}
						height={300}
					/>
				</div>
				<span className="font-semibold text-xl capitalize">{user?.name}</span>
				<span className="text-zinc-400 italic">{user?.email}</span>

				<div className="flex w-full flex-col items-center gap-2 h-full">
					<span className="font-semibold">{Iposts?.length}</span>
					<span className="text-zinc-400 italic">Posts</span>

					<div className="w-full p-2 flex flex-col justify-between h-full">
						<MenuAside />
						<LogoutButton />
					</div>
				</div>
			</div>
		</>
	);
}
