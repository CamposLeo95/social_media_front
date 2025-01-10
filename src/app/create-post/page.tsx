import { createPost } from "@/api/posts/create-post";
import photo from "@/assets/meu_pet.jpg";
import Card from "@/components/Card";

import Image from "next/image";
import Link from "next/link";
import { BiImage } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

export default async function NewPostPage() {
	return (
		<div className="text-white">
			<div className="h-screen bg-zinc-900 bg-opacity-85 absolute top-0 left-0 w-full flex justify-center ">
				<Card className="border-[1px] border-zinc-500 rounded-md shadow-md w-full md:w-[800px] flex flex-col gap-2 items-center opacity-100 h-[300px] mt-7">
					<div className="flex justify-between items-center gap-2 w-full">
						<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
							<Image
								src={photo}
								alt="imagem"
								className="w-full h-full object-cover"
							/>
						</div>
						<Link href="/">
							<CgClose />
						</Link>
					</div>
					<form className="w-full flex flex-col gap-3" action={createPost}>
						<textarea
							className="w-full outline-none bg-zinc-700 p-2 rounded-md h-40 resize-none"
							name="content"
						/>
						<div className="flex justify-between items-center gap-2 w-full">
							<div className="relative">
								<label
									htmlFor="image"
									className="cursor-pointer bg-blue-600 p-1 w-32 rounded-md flex items-center justify-center text-white hover:bg-blue-700 transition-colors gap-2"
								>
									<BiImage /> <span>Imagem</span>
								</label>
								<input type="file" name="image" id="image" className="hidden" />
							</div>
							<button
								className="bg-blue-600 p-1 w-20 rounded-md flex items-center justify-center"
								type="submit"
							>
								Enviar
							</button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
}
