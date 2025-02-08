import { getCommentByPost } from "@/api/comments/get-comment-by-id";
import { getPostById } from "@/api/posts/get-post-by-id";
import { getUserById } from "@/api/users/get-user-by-id";
import photo from "@/assets/perfil.png";
import Card from "@/components/card";
import { getSession, getUserData } from "@/utils/session";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";

import { findLikeByPost } from "@/api/like/find-like-by-post";
import { findLikeOnly } from "@/api/like/find-like-only";
import CardAsidePerfil from "@/components/aside";
import DeleteButtonComment from "@/components/button-delete-comment";
import LikeButton from "@/components/button-like";
import { BsArrowLeft } from "react-icons/bs";

type SegmentParams = {
	id: string;
};

interface CommentsProps {
	params?: Promise<SegmentParams>;
}
export default async function Comments(props: CommentsProps) {
	const param = await props.params;

	const { data: post } = await getPostById(param?.id);
	const { data: likeByPost } = await findLikeByPost(Number(post.id));
	const totalLikes = likeByPost;
	const token = await getSession().then((data) => data.token);
	const userId = await jwtDecode<{ userId: number }>(token)?.userId;
	const data = await findLikeOnly(Number(post?.id), userId);
	const user = await getUserById(post?.id_user);
	const userMe = await getUserData();
	const { data: comments } = await getCommentByPost(Number(post?.id));

	return (
		<div className="w-full flex flex-col gap-4 py-4 px-2  text-white relative md:flex-row md:gap-4 md:px-4 justify-center mt-10 md:mt-14">
			<div className="e_lg:flex flex-col relative">
				<div className="sticky top-2 hidden lg:flex">
					<CardAsidePerfil />
				</div>
			</div>
			<Card className="flex flex-col gap-2 p-4 md:w-[750px] ">
				<div className="w-full flex items-center justify-between gap-2">
					<div className="flex items-center gap-4 w-full ">
						<div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
							<Image
								src={post?.user?.image_perfil || photo}
								alt="imagem"
								height={100}
								width={100}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex flex-col">
							<span className="font-semibold text-xl capitalize">
								{user?.name}
							</span>
							<span className="text-zinc-400 italic">{user?.email}</span>
						</div>
					</div>
					<div className="mr-2">
						<Link href={"/app/posts"}>
							<BsArrowLeft />
						</Link>
					</div>
				</div>

				{/* Content */}
				<div className="w-full flex flex-col gap-4 mt-3 justify-center">
					<p>{post?.content}</p>
					<div className="overflow-hidden flex justify-center w-full p-4 rounded-md shadow-md my-3 ">
						<Image
							src={post?.image_url || photo}
							alt="imagem"
							height={450}
							width={400}
							className=" max-w-[350px] max-h-[360px]  object-cover text-center "
						/>
					</div>
				</div>
				{/* likes */}
				{post?.likes && post?.likes.length > 0 && (
					<div className="flex items-center py-4 gap-2  text-zinc-500">
						<div className=" bg-blue-600 p-1 rounded-full flex items-center justify-center w-5 h-5">
							<AiFillLike size={16} className="text-white" />
						</div>

						<div className="text-sm  italic ">
							{totalLikes.length}
							{totalLikes && <span>{totalLikes.length}</span>}
						</div>
					</div>
				)}
				<div className="h-[1px] bg-zinc-600 w-full my-4" />
				{/* actions */}
				<div className="flex items-center justify-between gap-2 py-1 px-6">
					<LikeButton
						userId={userId}
						post={post}
						token={token}
						totalLikes={totalLikes.length}
						Ilike={!!data}
					/>
				</div>
				<Card className="flex h-32 flex-1 w-full gap-2 ">
					<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
						<Image
							src={userMe?.image_perfil || photo}
							alt="imagem"
							width={100}
							height={100}
							className="w-[250px] h-full object-cover"
						/>
					</div>
					<Link
						href={"create-comment"}
						className="w-full h-full max-h-36 bg-zinc-700 rounded-md p-2"
					>
						<span className="text-zinc-400 ">
							Digite aqui seu comentario...
						</span>
					</Link>
				</Card>
				<div className="text-white  ">
					<ul className="flex flex-col gap-2">
						{comments &&
							(
								await Promise.all(
									comments.map(async (comment) => {
										const user = await getUserById(comment.id_user);
										return { ...comment, user };
									}),
								)
							).map((comment) => (
								<li
									key={comment.id}
									className="flex items-center justify-between w-full bg-zinc-700 rounded-md p-3"
								>
									<div className="flex flex-col items-center">
										<div className="flex items-center gap-2">
											<Image
												src={comment.user?.image_perfil || photo}
												alt="imagem"
												height={100}
												width={100}
												className="w-6 h-6 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md"
											/>
											<div>
												<p className="font-semibold text-sm capitalize italic text-zinc-400">
													@ {comment.user?.name}
												</p>
											</div>
										</div>
										<span className="ml-5 text-zinc-300 ">
											{comment.content}
										</span>
									</div>
									{userId === comment.id_user && (
										<DeleteButtonComment
											postId={post.id}
											commentId={comment.id}
										/>
									)}
								</li>
							))}
					</ul>
				</div>
			</Card>
		</div>
	);
}
