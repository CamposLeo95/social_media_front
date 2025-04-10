import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPageView from "./login.view";

const MockLoginForm = () => {
	return <input type="text" name="email" placeholder="Email" />;
};

describe("LoginPage", () => {
	it("should render LoginPage", async () => {
		render(
			<LoginPageView>
				<MockLoginForm />
			</LoginPageView>,
		);

		const heading = screen.getByRole("heading", {
			level: 1,
			name: /social share!/i,
		});
		expect(heading).toBeDefined();
	});
});
