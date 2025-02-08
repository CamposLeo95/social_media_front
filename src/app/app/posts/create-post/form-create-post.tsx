"use client";
import { createPost } from "@/api/posts/create-post";
import Form from "next/form";
import { useActionState, useState } from "react";
import { BiImage } from "react-icons/bi";
import { LuLoader } from "react-icons/lu";

export default function FormCreatePost() {
	const [state, createAction, isPending] = useActionState(createPost, null);

	const [prevImg, setPrevImg] = useState<string>("");

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleImage = (e: any) => {
		const file = e.target.files[0];
		setPrevImg(URL.createObjectURL(file));
	};

	return (
		<div className="w-full flex flex-col gap-3">
			<Form className="w-full flex flex-col gap-3" action={createAction}>
				<textarea
					className="w-full outline-none bg-zinc-700 p-2 rounded-md h-40 resize-none"
					name="content"
					placeholder="Escreva aqui..."
				/>
				<div className="flex justify-between items-center gap-2 w-full">
					<div className="relative">
						<label
							htmlFor="image"
							className={` ${isPending ? " bg-zinc-500 text-zinc-800 " : "cursor-pointer bg-blue-600   text-white hover:bg-blue-700 "} transition-colors gap-2 rounded-md flex items-center justify-center p-1 w-32`}
						>
							<BiImage /> <span>Imagem</span>
						</label>
						<input
							disabled={isPending}
							type="file"
							name="image"
							id="image"
							className="hidden"
							onChange={(e) => handleImage(e)}
						/>
					</div>
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
			{prevImg && (
				<div className="flex justify-center rounded-md overflow-hidden">
					<div className="rounded-md w-full md:w-[400px] overflow-hidden border-y-[1px] border-zinc-600">
						<img src={prevImg} alt="preview" className="w-full   " />
					</div>
				</div>
			)}
		</div>
	);
}
