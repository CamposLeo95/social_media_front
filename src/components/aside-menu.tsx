import { BsPerson } from "react-icons/bs";
import { CgFeed } from "react-icons/cg";

import LinkNavBar from "@/components/navbar-link";
import { checkSession } from "@/utils/session";

export default async function MenuAside() {
	const { id } = await checkSession();
	return (
		<div className="flex w-full flex-col items-center gap-4 ">
			<LinkNavBar
				url={`/app/profile/${id}`}
				icon={<BsPerson />}
				text="Meu Perfil"
			/>
			<LinkNavBar url="/app/posts" icon={<CgFeed />} text="Feed" />
		</div>
	);
}
