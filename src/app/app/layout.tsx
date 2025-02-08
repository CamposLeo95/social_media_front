import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { getUserData } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const session = await auth();
	const user = await getUserData();
	if (!session) {
		return redirect("/login");
	}

	return (
		<div>
			<NavBar user={user} />
			{children}
		</div>
	);
}
