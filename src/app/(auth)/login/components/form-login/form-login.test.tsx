import { render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { ILoginFormView } from "./form-login.view";
import LoginFormView from "./form-login.view";

vi.mock("react", () => {
	const actualReact = vi.importActual("react");
	return {
		...actualReact,
		useActionState: vi.fn(),
	};
});

import { useActionState } from "react";
import UseFormLogin from "./useForm-login";

const useActionStateMock: ILoginFormView = {
	state: {
		isSuccess: true,
		message: "",
	},
	formAction: (payload: FormData) => {},
	isPending: false,
};

describe("useFormLogin", () => {
	it("deve retornar dados mockados do useActionState", () => {
		const mockState = { isSuccess: true, message: "Login bem-sucedido" };
		const mockFormAction = vi.fn();
		const mockIsPending = false;

		(useActionState as unknown as vi.Mock).mockReturnValue([
			mockState,
			mockFormAction,
			mockIsPending,
		]);

		const { result } = renderHook(() => UseFormLogin());

		expect(result.current.state).toEqual(mockState);
		expect(result.current.formAction).toBe(mockFormAction);
		expect(result.current.isPending).toBe(false);
	});
});
