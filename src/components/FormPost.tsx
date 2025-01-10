"use client";

import photo from "@/assets/meu_pet.jpg";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import Card from "./Card";

export const FormPost = () => {
	const [openForm, setOpenForm] = useState(false);
	const inputImageRef = useRef<HTMLInputElement>(null);

	const handleInputImage = () => {
		inputImageRef.current?.click();
	};

	return (
		<>

			{openForm && (
				<div className="h-screen bg-zinc-100 bg-opacity-85 absolute top-0 left-0 w-full flex items-center roun justify-center inset-0">
					<Card className=" absolute border-[1px] border-zinc-500 rounded-none left-0 shadow-md h-72 top-10 w-full md:w-[800px] z-50 flex flex-col gap-2 items-center opacity-100">
						<div className="flex justify-between items-center gap-2 w-full">
							<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
								<Image
									src={photo}
									alt="imagem"
									className="w-full h-full object-cover"
								/>
							</div>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button onClick={() => setOpenForm(false)}>
								<IoCloseCircleOutline size={25} />
							</button>
						</div>
						<form className=" w-full flex flex-col gap-3 ">
							<textarea className="w-full outline-none bg-zinc-700 p-2  rounded-md h-40 resize-none " />
							<div className="flex justify-between items-center gap-2 w-full">
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									onClick={handleInputImage}
									className="flex items-center justify-center  cursor-pointer"
								>
									<input type="file" ref={inputImageRef} className="hidden" />
									<FaRegImage size={25} />
								</button>
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
			)}
		</>
	);
};

export default FormPost;
