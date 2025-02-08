"use client";
import { deleteComment } from "@/api/comments/delete-comment";
import Form from "next/form";
import { useActionState } from "react";
import { BiTrash } from "react-icons/bi";

interface IDeleteButtonProps {
	commentId: number;
	postId: string;
}

export default function DeleteButtonComment({
	commentId,
	postId,
}: IDeleteButtonProps) {
	const [state, formAction, isPending] = useActionState(deleteComment, null);
	return (
		<Form className="cursor-pointer" action={formAction}>
			<input
				type="text"
				name="commentId"
				defaultValue={commentId}
				className="hidden"
			/>
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
