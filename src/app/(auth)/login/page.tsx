import bgLogin from "@/assets/background_login.jpg";

import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import LoginForm from "./components/form-login";

export default async function LoginPage() {
	const coockieStore = await cookies();
	const token = coockieStore.get("auth.token")?.value;

	if (token) {
		redirect("/app/posts");
	}
	return (
		<div className=" w-full md:px-24 lg:px-0 lg:justify-center lg:w-full flex gap-2 h-screen items-center text-white">
			<div className="flex h-screen gap-2 w-full  md:w-full rounded-lg p-4 md:h-[700px] bg-neutral-900 lg:w-[1000px]">
				<div className="w-full rounded-md overflow-hidden bg-cover bg-center h-full hidden lg:flex">
					<Image
						src={bgLogin}
						alt="imagem login"
						width={600}
						height={450}
						className="w-full h-full object-cover flex-1"
					/>
				</div>
				<div className="w-full p-4 flex flex-col gap-6 justify-center items-center px-4">
					<LoginForm />
					<div className="flex w-full justify-evenly border-t-[1px] border-zinc-700 p-5 gap-2">
						<button
							className="bg-zinc-800 text-white text-sm flex justify-center items-center gap-3 p-2 rounded-full md:w-40 shadow-lg w-20"
							type="button"
						>
							<FaGithub className="text-lg" />
							<span className="hidden md:flex">GitHub</span>
						</button>
						<button
							className="bg-zinc-800 text-white text-sm flex justify-center items-center gap-3 p-2 rounded-full md:w-40 shadow-lg w-20"
							type="button"
						>
							<BiLogoGmail className="text-lg" />
							<span className="hidden md:flex">Google</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
