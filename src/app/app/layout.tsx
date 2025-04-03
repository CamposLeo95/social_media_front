import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { getUserData } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const token = await auth();
	const userData = await getUserData();

	if (!token) {
		redirect("/login");
	}

	return (
		<div>
			<NavBar user={userData} />
			{children}
		</div>
	);
}
