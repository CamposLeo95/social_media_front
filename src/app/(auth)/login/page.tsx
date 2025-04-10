import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "./components/form-login/form-login.viewModel";
import LoginPageView from "./login.view";

export default async function LoginPage() {
	const coockieStore = await cookies();
	const token = coockieStore.get("auth.token")?.value;

	if (token) {
		redirect("/app/posts");
	}
	return (
		<LoginPageView>
			<LoginForm />
		</LoginPageView>
	);
}
