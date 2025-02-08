"use client";

import Link from "next/link";

interface LinkNavBarProps {
	icon: React.ReactNode;
	text: string;
	url: string;
}
export default function LinkNavBar(props: LinkNavBarProps) {
	return (
		<Link
			href={props.url}
			className="flex items-center gap-4 p-4 w-full lg:p-3 bg-zinc-800
			active:bg-zinc-800 rounded-md hover:bg-blue-600 "
		>
			{props.icon}
			<span>{props.text}</span>
		</Link>
	);
}
