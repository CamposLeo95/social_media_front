import { getPostById } from "@/api/posts/get-post-by-id";
import { getUserById } from "@/api/users/get-user-by-id";
import photo from "@/assets/meu_pet.jpg";
import Card from "@/components/Card";
import CardPosts from "@/components/CardPosts";
import { getSession, getUser } from "@/utils/session";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";

import CardAsidePerfil from "@/components/CardAsidePerfil";
import LikeButton from "@/components/LikeButton";
import { BsArrowLeft, BsBack } from "react-icons/bs";

type SegmentParams = {
	id: string;
};

interface CommentsProps {
	params?: Promise<SegmentParams>;
}
export default async function Comments(props: CommentsProps) {
	const param = await props.params;

	const post = await getPostById(param?.id);

	const user = await getUserById(String(post?.likes[0]?.userId));
	const token = await getSession().then((data) => data.token);
	const userId = jwtDecode<{ userId: number }>(token)?.userId;

	const totalLikes = post?.likes.length;

	return (
		<div className="w-full flex flex-col gap-4 py-4 px-2  text-white relative md:flex-row md:gap-4 md:px-4 justify-center">
			<div className="e_lg:flex flex-col relative">
				<div className="sticky top-2">
					<CardAsidePerfil />
				</div>
			</div>
			<Card className="flex flex-col gap-2 p-4 md:w-[750px] ">
				<div className="w-full flex items-center justify-between gap-2">
					<div className="flex items-center gap-2 w-full">
						<div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
							<Image
								src={post?.user?.image || photo}
								alt="imagem"
								height={100}
								width={100}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex flex-col">
							<span className="font-semibold text-xl capitalize">
								{post?.user?.name}
							</span>
							<span className="text-zinc-400 italic">{post?.user?.email}</span>
						</div>
					</div>
					<div className=" mr-2">
						<Link href={"/"}>
							<BsArrowLeft />
						</Link>
					</div>
				</div>

				{/* Content */}
				<div className="w-full flex flex-col gap-2">
					<p>{post?.content}</p>
					<Image
						src={post?.image || photo}
						alt="imagem"
						height={450}
						width={400}
						className="w-full h-[350px] object-cover"
					/>
				</div>
				{/* likes */}
				{post?.likes && post?.likes.length > 0 && (
					<div className="flex items-center gap-2 mt-5 text-zinc-500">
						<div className=" bg-blue-600 p-1 rounded-full flex items-center justify-center w-5 h-5">
							<AiFillLike size={16} className="text-white" />
						</div>

						<div className="text-sm  italic ">
							<span>{user.name}</span>
							{post?.likes.length > 1 && (
								<span>
									{" "}
									, <span>{totalLikes && totalLikes - 1}</span>
									{totalLikes && totalLikes < 2
										? "and others "
										: " more like this"}
								</span>
							)}
						</div>
					</div>
				)}
				<div className="h-[1px] bg-zinc-600 w-full" />
				{/* actions */}
				<div className="flex items-center justify-between gap-2 py-1 px-6">
					<LikeButton userId={userId} post={post} token={token} />
				</div>
				<Card className="flex h-32 flex-1 w-full gap-2 ">
					<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
						<Image
							src={photo}
							alt="imagem"
							width={100}
							height={100}
							className="w-full h-full object-cover"
						/>
					</div>
					<Link
						href={`/${post?.id}/create-comment`}
						className="w-full hfull bg-zinc-700 rounded-md p-2"
					>
						<span className="text-zinc-400 ">Comente nessa publicação</span>
					</Link>
				</Card>
				<div className="text-white  ">
					<ul className="flex flex-col gap-2">
						{post?.comments.map(async (comment) => (
							<>
								<li key={comment.id} className="flex flex-col gap-2 p-3">
									<div className="flex items-center gap-2">
										<Image
											src={
												(await getUserById(String(comment.userId)))?.image ||
												photo
											}
											alt="imagem"
											height={100}
											width={100}
											className="w-6 h-6 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md"
										/>

										<div>
											<p className="font-semibold text-sm capitalize">
												{(await getUserById(String(comment.userId)))?.name}
											</p>
											<p className="text-zinc-400 italic text-sm ">
												{(await getUserById(String(comment.userId)))?.email}
											</p>
										</div>
									</div>
									<p className="ml-10">{comment.content}</p>
								</li>
							</>
						))}
					</ul>
				</div>
			</Card>
		</div>
	);
}
