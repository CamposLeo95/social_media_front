import type { IPost } from "@/api/types/post";
import type { IUser } from "@/api/types/user";
import photo from "@/assets/meu_pet.jpg";
import { getSession } from "@/utils/session";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Card from "./Card";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

export async function getUser(userId: number): Promise<{ user: IUser }> {
	"use server";
	const session = await getSession();
	const response = await fetch(`http://localhost:3333/users/${userId}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${session.token}`,
		},
	});
	return response.json();
}

interface ICardPostsProps {
	posts: IPost;
}

export default async function CardPosts(props: ICardPostsProps) {
	const user = await getUser(props?.posts?.likes[0]?.userId).then(
		(data) => data.user,
	);
	const token = await getSession().then((data) => data.token);
	const userId = jwtDecode<{ userId: number }>(token)?.userId;

	const totalLikes = props?.posts?.likes.length;

	return (
		<Card className="flex flex-col gap-2 p-4 ">
			<div className="w-full flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 w-full">
					<div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
						<Image
							src={props?.posts?.user?.image || photo}
							alt="imagem"
							height={100}
							width={100}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="flex flex-col	">
						<span className="font-semibold text-xl">
							{props?.posts?.user?.name}
						</span>
						<span className="text-zinc-400 italic">
							{props.posts?.user?.email}
						</span>
					</div>
				</div>
				<div className=" mr-2">
					{userId === props.posts.userId && (
						<DeleteButton postId={props.posts.id} token={token} />
					)}
				</div>
			</div>

			{/* Content */}
			<div className="w-full flex flex-col gap-2">
				<p>{props?.posts?.content}</p>
				<Image
					src={props?.posts?.image || photo}
					alt="imagem"
					height={550}
					width={500}
					className="w-full h-[350px] object-cover"
				/>
			</div>
			{/* likes */}
			{props?.posts?.likes.length > 0 && (
				<div className="flex items-center gap-2 mt-5 text-zinc-500">
					<div className=" bg-blue-600 p-1 rounded-full flex items-center justify-center w-5 h-5">
						<AiFillLike size={16} className="text-white" />
					</div>

					<div className="text-sm  italic ">
						<span>{user.name}</span>
						{props?.posts?.likes.length > 1 && (
							<span>
								{" "}
								, <span>{totalLikes - 1}</span>
								{totalLikes < 2 ? "and others " : " more like this"}
							</span>
						)}
					</div>
				</div>
			)}
			<div className="h-[1px] bg-zinc-600 w-full" />
			{/* actions */}
			<div className="flex items-center justify-between gap-2 py-1 px-6">
				<LikeButton userId={userId} post={props?.posts} token={token} />
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<div className="flex items-center gap-2 items-center">
					<span>{props?.posts?.comments?.length}</span>
					<Link href={`/${props.posts.id}/comment`}>
						<BiCommentDetail size={25} />
					</Link>
				</div>
			</div>
		</Card>
	);
}
