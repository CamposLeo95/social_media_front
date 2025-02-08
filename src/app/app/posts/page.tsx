import { getPosts } from "@/api/posts/get-posts";
import photo from "@/assets/perfil.png";
import photoSocialDev from "@/assets/socialDev.png";
import CardAsidePerfil from "@/components/aside";
import Card from "@/components/card";
import CardPosts from "@/components/card-posts";
import { getUserData } from "@/utils/session";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Posts() {
	const user = await getUserData();
	const posts = await getPosts();

	return (
		<main className="w-full flex flex-col gap-4 py-4 px-2  text-white relative lg:flex-row md:gap-4 md:px-4 justify-center mt-8">
			<div className="e_lg:flex flex-col relative">
				<div className="sticky top-2 hidden lg:flex">
					<CardAsidePerfil />
				</div>
			</div>
			<div className=" lg:w-[800px] space-y-3">
				<Card className="flex h-32 flex-1 w-full gap-2 ">
					<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md ">
						<Image
							src={user?.image_perfil || photo}
							alt="imagem"
							width={100}
							height={100}
							className="w-full h-full object-cover"
						/>
					</div>
					<Link
						href={"posts/create-post"}
						className="w-full hfull bg-zinc-700 rounded-md p-2"
					>
						<span className="text-zinc-400 ">Escreva uma nova postagem!</span>
					</Link>
				</Card>
				<Suspense fallback={<div>Carregando...</div>}>
					{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
					{posts?.map((post: any) => (
						<CardPosts key={post?.id} posts={post} />
					))}
				</Suspense>
			</div>
			<div className="hidden e_lg:flex flex-col relative">
				<div className="sticky top-2">
					<Card className=" min-w-[300px] flex flex-col gap-2 items-center relative overflow-hidden">
						<div className=" w-[350px]  bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md z-20 mt-10 border-4 border-zinc-900">
							<Image
								src={photoSocialDev}
								alt="imagem"
								width={400}
								height={450}
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="font-semibold text-xl">
							Seja Bem-vindo! A Social-Dev{" "}
						</span>
						<span className="text-zinc-400 italic">
							A rede social dos DEV`s!
						</span>

						<span className="text-zinc-400 italic w-[350px] text-center">
							Um lugar para se conectar com pessoas que compartilham suas
							paixões, trocar ideias e construir histórias juntos. Aqui, você
							pode compartilhar experiências, explorar conteúdos relevantes e
							interagir em um ambiente acolhedor e seguro. Junte-se à nossa
							comunidade e transforme conexões em algo especial!
						</span>
					</Card>
				</div>
			</div>
		</main>
	);
}
