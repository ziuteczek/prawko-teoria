import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Login from "../src/app/pages/login";
import "@testing-library/jest-dom/vitest";

vi.mock("../src/utils/supabase", () => ({
	default: {
		auth: {
			signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
		},
	},
}));

import supabase from "../src/utils/supabase";

import { correctEmail, correntPassword } from "./setupTests";

describe("Login page", () => {
	function setup() {
		render(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		);

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/hasło/i);
		const formEl = screen.getByTestId("register-form");
		const loginBtn = screen.getByRole("button", { name: /zaloguj się/i });
		const registerLink = screen.getByRole("link", {
			name: /zarejestruj się/i,
		});

		return { emailInput, passwordInput, loginBtn, registerLink, formEl };
	}

	it("renders login elements", () => {
		const allElements = setup();
		const allElementsArr = Object.values(allElements);

		allElementsArr.forEach((el) => expect(el).toBeInTheDocument());
	});

	it("Allows logging", async () => {
		const { emailInput, passwordInput, formEl } = setup();

		fireEvent.change(emailInput, { target: { value: correctEmail } });
		fireEvent.change(passwordInput, { target: { value: correntPassword } });

		fireEvent.submit(formEl);

		await waitFor(() => {
			expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
				email: correctEmail,
				password: correntPassword,
			});
		});
	});
});
