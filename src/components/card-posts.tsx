import { getCommentByPost } from "@/api/comments/get-comment-by-id";
import { findLikeByPost } from "@/api/like/find-like-by-post";
import { findLikeOnly } from "@/api/like/find-like-only";
import type { IPost } from "@/api/types/post";
import { getUserById } from "@/api/users/get-user-by-id";
import photo from "@/assets/perfil.png";
import DeleteButton from "@/components/button-delete-post";
import LikeButton from "@/components/button-like";
import Card from "@/components/card";
import { getSession } from "@/utils/session";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { BiCommentDetail } from "react-icons/bi";

interface ICardPostsProps {
	posts: IPost;
}

export default async function CardPosts(props: ICardPostsProps) {
	const token = await getSession().then((data) => data.token);
	const userId = jwtDecode<{ userId: number }>(token)?.userId;
	const user = await getUserById(props.posts.id_user);
	const data = await findLikeOnly(Number(props?.posts?.id), userId);
	const { data: likeByPost } = await findLikeByPost(Number(props.posts.id));
	const totalLikes = likeByPost?.length;
	const { data: comments } = await getCommentByPost(Number(props?.posts.id));

	return (
		<Card className="flex flex-col gap-2 p-4 shadow-lg">
			<div className="w-full flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 w-full">
					<div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
						<Image
							src={user?.image_perfil || photo}
							alt="imagem"
							height={100}
							width={100}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="flex flex-col	">
						<span className="font-semibold text-xl">{user?.name}</span>
						<span className="text-zinc-400  italic text-sm">
							@{user?.email.split("@")[0]}
						</span>
					</div>
				</div>
				<div className=" mr-2">
					{userId === props.posts.id_user && (
						<DeleteButton postId={props.posts.id} token={token} />
					)}
				</div>
			</div>

			{/* Content */}
			<div className="w-full flex flex-col gap-2 ">
				<p>{props?.posts?.content}</p>
				<div className=" w-full p-4 md:h-[350px] lg:h-[450px] flex items-center justify-center rounded-md shadow-md my-3 ">
					<Image
						src={props?.posts?.image_url || photo}
						alt="imagem"
						height={550}
						width={500}
						className="w-[250px] h-[250px] md:w-[350px] md:h-[340px] lg:w-[450px] lg:h-[440px]  object-cover"
					/>
				</div>
			</div>
			<div className="h-[1px] bg-zinc-600 w-full" />
			{/* actions */}
			<div className="flex items-center gap-4 py-1 px-2">
				<LikeButton
					userId={userId}
					post={props?.posts}
					token={token}
					totalLikes={totalLikes}
					Ilike={!!data}
				/>
				<div className="flex items-center gap-2 ">
					<Link
						href={`posts/${props.posts.id}/comment`}
						className="flex items-start gap-2"
					>
						<BiCommentDetail size={25} />

						{comments && comments?.length > 0 && (
							<span>
								{comments?.length}{" "}
								{comments.length > 1 ? "comentarios" : "comentario"}
							</span>
						)}
					</Link>
				</div>
			</div>
		</Card>
	);
}
