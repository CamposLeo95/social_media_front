import bgLogin from "@/assets/background_login.jpg";

import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import RegisterForm from "./components/form-register";

export default async function RegisterPage() {
	const coockieStore = await cookies();
	const token = coockieStore.get("auth.token")?.value;

	if (token) {
		redirect("/app/posts");
	}
	return (
		<div className=" w-full md:px-24 lg:px-0 lg:justify-center lg:w-full flex gap-2 h-screen items-center text-white">
			<div className="flex gap-2 w-full h-screen  md:w-full rounded-lg p-4 md:h-[700px] bg-neutral-900 lg:w-[1000px]">
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
					<RegisterForm />
				</div>
			</div>
		</div>
	);
}
