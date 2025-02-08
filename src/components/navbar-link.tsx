"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

interface LinkNavBarProps {
	icon: React.ReactNode;
	text: string;
	url: string;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
export default function LinkNavBar(props: LinkNavBarProps) {
	return (
		<Link
			href={props.url}
			className="flex items-center gap-4 p-4 w-full lg:p-3 bg-zinc-800
			active:bg-zinc-800 rounded-md hover:bg-blue-600 "
			// biome-ignore lint/complexity/useOptionalChain: <explanation>
			onClick={() => props.setIsOpen && props.setIsOpen(false)}
		>
			{props.icon}
			<span>{props.text}</span>
		</Link>
	);
}
