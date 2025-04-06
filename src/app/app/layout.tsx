import NavBar from "@/components/navbar";
import { checkSession } from "@/utils/session";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const user = await checkSession();

	return (
		<div>
			<NavBar user={user} />
			{children}
		</div>
	);
}
