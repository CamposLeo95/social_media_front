import { authAction } from "@/api/auth/auth";
import { useActionState } from "react";

export default function UseFormLogin() {
	const [state, formAction, isPending] = useActionState(authAction, {
		isSuccess: true,
		message: "",
	});

	return {
		state,
		formAction,
		isPending,
	};
}
