import { BsPerson } from "react-icons/bs";
import { CgFeed } from "react-icons/cg";

import LinkNavBar from "@/components/navbar-link";
import { getUserData } from "@/utils/session";

export default async function MenuAside() {
	const user = await getUserData();
	return (
		<div className="flex w-full flex-col items-center gap-4 ">
			<LinkNavBar
				url={`/app/profile/${user.id}`}
				icon={<BsPerson />}
				text="Meu Perfil"
			/>
			<LinkNavBar url="/app/posts" icon={<CgFeed />} text="Feed" />
		</div>
	);
}
