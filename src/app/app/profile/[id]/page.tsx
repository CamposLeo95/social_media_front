import { getPostByUserId } from "@/api/posts/get-post-by-user-id";
import type { IPost } from "@/api/types/post";
import { getUserById } from "@/api/users/get-user-by-id";
import photo from "@/assets/perfil.png";
import CardPosts from "@/components/card-posts";

import Image from "next/image";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

type SegmentParams = {
	id: string;
};

export default async function Profile({ params }: { params: SegmentParams }) {
	const user = await getUserById(Number(params.id));
	const { data: posts } = await getPostByUserId(user.id);
	return (
		<main className="  mt-12 text-white relative w-full md:gap-4 md:px-4 justify-center flex">
			<div className="w-full  lg:max-w-[800px] flex flex-col gap-4 py-6 px-2 ">
				<Link
					href="/app/posts"
					className="w-full justify-end flex text items-center gap-2 italic"
				>
					<BiArrowBack /> <span>Ir para postagens</span>
				</Link>

				<div className=" min-w-[300px] flex flex-col gap-2 pb-7 items-center relative overflow-hidden  bg-zinc-900 rounded-md shadow-md">
					<Image
						src={user?.image_cover || photo}
						alt="imagem"
						className="w-full h-32 top-0 object-cover absolute"
						width={300}
						height={300}
					/>
					<div className="w-28 h-28 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md z-20 mt-16 border-4 border-zinc-900">
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
					<div className="border-b-2 border-zinc-700 w-[80%] h-1" />
					<div className="flex w-28 flex-col items-center gap-2 mt-7 border-2 h-28  border-zinc-400 rounded-full justify-center p-2">
						<span className="font-semibold">{posts?.length}</span>
						<span className="text-zinc-400 italic">Postagens</span>
					</div>
				</div>
				<div className="flex items-center px-11">
					<div className="w-56 ">
						<span className="uppercase">Meus Posts</span>
					</div>

					<div className="border-b-2 border-zinc-700 w-[100%] h-1 grow" />
				</div>
				{posts?.map((post: IPost) => (
					<CardPosts key={post?.id} posts={post} />
				))}
			</div>
		</main>
	);
}
