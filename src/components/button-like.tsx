"use client";

import toggleLikeAction from "@/api/like/toggle-like";
import type { IPost } from "@/api/types/post";
import Form from "next/form";
import { useActionState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

interface LikeButtonProps {
	userId: number;
	post: IPost | null;
	token: string;
	totalLikes: number;
	Ilike: boolean;
}

export default function LikeButton(props: LikeButtonProps) {
	const { post, token, totalLikes, Ilike } = props;
	const [_state, formAction, _isPending] = useActionState(toggleLikeAction, {
		token,
		postId: post?.id,
	});

	return (
		<Form action={formAction} className="flex items-center gap-2">
			<input type="text" name="token" defaultValue={token} className="hidden" />
			<input
				type="text"
				name="postId"
				defaultValue={post?.id}
				className="hidden"
			/>
			<button type="submit" className="flex items-center gap-2">
				{Ilike ? (
					<div className="flex items-center h-full gap-2">
						<BsFillHeartFill size={20} className="text-red-500" />
						{totalLikes > 0 && <span>{totalLikes} Like</span>}
					</div>
				) : (
					<div className="flex items-center h-full gap-2">
						<BsHeart size={20} />
						{totalLikes > 0 && <span>{totalLikes} Like</span>}
					</div>
				)}
			</button>
		</Form>
	);
}
