"use client";

import LogoutButton from "@/components/button-logout";
import LinkNavBar from "@/components/navbar-link";
import { getUserData } from "@/utils/session";

import { use, useState } from "react";
import { BiX } from "react-icons/bi";
import { CgFeed } from "react-icons/cg";
import { IoPerson } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);

	const user = use(getUserData());

	return (
		<nav className="w-full bg-zinc-800 fixed top-0 lg:hidden h-14 p-2 flex items-center  px-6 text-white z-40">
			<div className="flex justify-between w-full items-center">
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button onClick={() => setIsOpen(true)}>
					<MdMenu className="text-2xl" />
				</button>
				<div>SocialDev</div>
			</div>
			{isOpen && (
				<div className=" w-full md:w-[80%] h-screen z-50 fixed left-0 top-0 bg-zinc-900 flex flex-col ">
					{/* button close */}
					<div className="flex p-4 md:p-9 ">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={() => setIsOpen(false)}
							className="bg-zinc-700 hover:bg-zinc-800 rounded-full  h-8 w-8 md:h-12 md:w-12 flex justify-center items-center"
						>
							<BiX />
						</button>
					</div>
					{/* photo */}
					<div className="w-full flex justify-center items-center gap-4 ">
						<div className="bg-zinc-400 rounded-full h-20 w-20 md:h-20 md:w-20 flex justify-center items-center text-xl ">
							LA
						</div>
					</div>
					{/* links */}
					<div className="flex-1 flex  flex-col h-2/4 justify-between py-5">
						<div className="flex flex-col gap-4 px-12 ">
							<LinkNavBar
								icon={<IoPerson />}
								text="Perfil"
								url={`/app/profile/${user?.id}`}
							/>
							<LinkNavBar icon={<CgFeed />} text="Feeds" url="/app/posts" />
						</div>
						{/* footer */}
						<div className="flex flex-col gap-4 px-12 ">
							<LogoutButton />
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
