"use client";
import photo from "@/assets/perfil.png";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { CgClose } from "react-icons/cg";
import Card from "./card";

export default function Modal({
	children,
	className,
	imgTitle,
	title,
}: {
	children: ReactNode;
	className: string;
	imgTitle?: string;
	title?: string | ReactNode;
}) {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<div className="w-screen h-screen absolute top-0  flex justify-center ">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="w-screen opacity-70 h-screen absolute top-0 bg-zinc-600"
				onClick={() => {
					console.log("ok");
				}}
			/>
			<Card
				className={cn(
					"border border-zinc-600 rounded-md shadow-md flex flex-col gap-2 items-center z-10",
					className,
				)}
			>
				<div className="flex justify-between items-center gap-2 w-full">
					<div className="flex items-center gap-2 text-zinc-500">
						{imgTitle && (
							<div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center bg-cover shadow-md">
								<Image
									src={photo}
									alt="imagem"
									className="w-full h-full object-cover"
									width={100}
									height={100}
								/>
							</div>
						)}
						<span>{title}</span>
					</div>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button onClick={handleBack}>
						<CgClose />
					</button>
				</div>
				{children}
			</Card>
		</div>
	);
}
