import LogoutAction from "@/api/logout/logout";
import Form from "next/form";
import { BiExit } from "react-icons/bi";

export default function LogoutButton() {
	return (
		<Form className="w-full " action={LogoutAction}>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button className="bg-zinc-700 hover:bg-blue-600 text-white p-3 rounded-md w-full text-center flex  items-center gap-6 hover:shadow-md ">
				<BiExit />
				<span>Sair</span>
			</button>
		</Form>
	);
}
