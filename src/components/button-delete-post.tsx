"use client";
import { deletePost } from "@/api/posts/delete-post";
import Form from "next/form";
import { useActionState } from "react";
import { BiTrash } from "react-icons/bi";

interface IDeleteButtonProps {
	postId: string;
	token: string;
}

export default function DeleteButton({ postId, token }: IDeleteButtonProps) {
	const [state, formAction, isPending] = useActionState(deletePost, null);
	return (
		<Form className="cursor-pointer" action={formAction}>
			<input type="text" name="token" defaultValue={token} className="hidden" />
			<input
				type="text"
				name="postId"
				defaultValue={postId}
				className="hidden"
			/>
			<button type="submit">
				<BiTrash />
			</button>
		</Form>
	);
}
