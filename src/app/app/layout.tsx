import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const session = await auth();

	if (!session) {
		return redirect("/login");
	}

	return (
		<div>
			<NavBar />

			{children}
		</div>
	);
}
