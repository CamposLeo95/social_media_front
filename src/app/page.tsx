import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const session = await auth();

	if (session) {
		return redirect("/app/posts");
	}
	return (
		<main className="w-full flex flex-col gap-4 py-4 px-2  text-white relative lg:flex-row md:gap-4 md:px-4 justify-center">
			home page
		</main>
	);
}
