"use client";
import { createComment } from "@/api/comments/create-comment";
import photo from "@/assets/perfil.png";
import Card from "@/components/card";
import Form from "next/form";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { LuLoader } from "react-icons/lu";

export default function FormCreateComment() {
	const { id } = useParams();

	const [state, formAction, isPending] = useActionState(createComment, null);
	const router = useRouter();

	const handleClose = () => {
		router.back();
	};

	return (
		<Card className="border-[1px] text-white rounded-md shadow-md w-full md:w-[800px] flex flex-col gap-2 items-center opacity-100 h-[300px] mt-7">
			<div className="flex justify-between items-center gap-2 w-full">
				<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
					<Image
						src={photo}
						alt="imagem"
						className="w-full h-full object-cover"
					/>
				</div>
				<button type="button" onClick={handleClose}>
					<CgClose />
				</button>
			</div>
			<Form className="w-full flex flex-col gap-3" action={formAction}>
				<input type="hidden" name="postId" defaultValue={id} />
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
			</Form>
		</Card>
	);
}
