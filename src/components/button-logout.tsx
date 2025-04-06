"use client";

import LogoutAction from "@/api/logout/logout";
import Form from "next/form";
import { useActionState } from "react";
import { BiExit } from "react-icons/bi";

export default function LogoutButton() {
	const [_, logoutAction, isPending] = useActionState(LogoutAction, null);
	return (
		<Form className="w-full " action={logoutAction}>
			<button
				type="submit"
				className="bg-zinc-700 hover:bg-blue-600 text-white p-3 rounded-md w-full text-center flex  items-center gap-6 hover:shadow-md "
			>
				<BiExit />
				<span>Sair</span>
			</button>
		</Form>
	);
}
