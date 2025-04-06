import type { ReactNode } from "react";

export default async function CommentLayout({
	children,
	modal,
}: { children: ReactNode; modal: ReactNode }) {
	return (
		<div>
			{children}
			{modal}
		</div>
	);
}
