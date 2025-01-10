"use client";

import { deletePost } from "@/api/posts/delete-post";
import { useRouter } from "next/navigation";
import { BiTrash } from "react-icons/bi";

interface IDeleteButtonProps {
	postId: string;
	token: string;
}

export default function DeleteButton({ postId, token }: IDeleteButtonProps) {
	const router = useRouter();
	async function handleDelete() {
		await deletePost(postId, token);
		router.refresh();
	}
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div className="cursor-pointer" onClick={handleDelete}>
			<BiTrash />
		</div>
	);
}
