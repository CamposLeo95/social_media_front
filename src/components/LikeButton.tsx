"use client";

import type { IPost } from "@/api/types/post";
import { useRouter } from "next/navigation";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

interface LikeButtonProps {
	userId: number;
	post: IPost | null;
	token: string;
}

async function handleLike(postId: string, userId: number, token: string) {
	const response = await fetch(`http://localhost:3333/posts/${postId}/like`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId: userId }),
	});

	const data = await response.json();

	return data;
}

export default function LikeButton(props: LikeButtonProps) {
	const { post, userId, token } = props;
	const router = useRouter();
	const handleLikePost = async () => {
		await handleLike(post ? post.id : "0", userId, token);
		router.refresh();
	};

	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button
			onClick={() => handleLikePost()}
			className="flex items-center gap-2"
		>
			{props?.post?.likes?.find((user) => user.userId === props.userId) ? (
				<AiFillLike size={25} className="text-blue-600" />
			) : (
				<AiOutlineLike size={25} />
			)}
		</button>
	);
}
