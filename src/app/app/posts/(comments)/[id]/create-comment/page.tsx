"use client";

import { createComment } from "@/api/comments/create-comment";
import photo from "@/assets/perfil.png";
import Card from "@/components/card";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use, useActionState } from "react";
import { CgClose } from "react-icons/cg";
import { LuLoader } from "react-icons/lu";

type SegmentParams = {
	id: string;
};

interface CommentsProps {
	params?: SegmentParams;
}

export default function CreateCommentPage(props: CommentsProps) {
	const [state, formAction, isPending] = useActionState(createComment, null);
	const { id } = useParams<SegmentParams>();

	const postId = Number(id) || 0;

	return (
		<div className="text-white ">
			<div className="h-screen bg-zinc-900 bg-opacity-85 absolute top-0 left-0 w-full flex justify-center mt-10  px-2 ">
				<Card className="border-[1px] border-zinc-500 rounded-md shadow-md w-full md:w-[800px] flex flex-col gap-2 items-center opacity-100 h-[300px] mt-7">
					<div className="flex justify-between items-center gap-2 w-full">
						<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
							<Image
								src={photo}
								alt="imagem"
								className="w-full h-full object-cover"
							/>
						</div>
						<Link href={`/app/posts/${postId}/comment`}>
							<CgClose />
						</Link>
					</div>
					<form className="w-full flex flex-col gap-3" action={formAction}>
						<input type="hidden" name="postId" defaultValue={postId} />
						<textarea
							className="w-full outline-none bg-zinc-700 p-2 rounded-md h-40 resize-none"
							name="content"
							placeholder="Escreva aqui..."
						/>
						<div className="flex justify-between items-center gap-2 w-full">
							<button
								className={`bg-blue-600 p-1 w-20 rounded-md flex items-center justify-center ${isPending ? "bg-opacity-50" : "hover:bg-blue-700"} transition-colors`}
								type="submit"
								disabled={isPending}
							>
								{isPending ? (
									<span className="animate-spin p-2">
										<LuLoader />
									</span>
								) : (
									<span className="p-1">Enviar</span>
								)}
							</button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
}
