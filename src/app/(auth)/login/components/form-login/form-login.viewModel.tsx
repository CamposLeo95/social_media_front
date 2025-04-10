"use client";
import LoginFormView from "./form-login.view";
import UseFormLogin from "./useForm-login";

export default function LoginForm() {
	const props = UseFormLogin();

	return <LoginFormView {...props} />;
}
