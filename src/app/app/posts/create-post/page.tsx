import photo from "@/assets/perfil.png";
import Card from "@/components/card";

import { getUserData } from "@/utils/session";
import Image from "next/image";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import FormCreatePost from "./form-create-post";

export default async function CreatePostPage() {
	const user = await getUserData();
	return (
		<div className="text-white ">
			<div className="bg-opacity-85 absolute top-0 left-0 w-full flex justify-center mt-14 px-2">
				<Card className="border-[1px] border-zinc-500 rounded-md shadow-md w-full md:w-[800px] flex flex-col gap-2 items-center opacity-100 min-h-[300px] mt-7">
					<div className="flex justify-between items-center gap-2 w-full">
						<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
							<Image
								src={user?.image_perfil || photo}
								alt="imagem"
								className="w-full h-full object-cover"
								width={100}
								height={100}
							/>
						</div>
						<Link href="/app/posts">
							<CgClose />
						</Link>
					</div>
					<FormCreatePost />
				</Card>
			</div>
		</div>
	);
}
