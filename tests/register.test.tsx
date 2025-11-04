import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Register from "../src/app/pages/register";
import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("../src/utils/supabase", () => ({
	default: {
		auth: {
			signUp: vi.fn().mockResolvedValue({ error: null }),
		},
	},
}));

import supabase from "../src/utils/supabase";
import { correctEmail, correntPassword } from "./setupTests";

describe("Register rendering", () => {
	const passwordsSameMessage = /hasla są takie same/i;
	const passwordsNotSameMessage = /hasła nie są takie same/i;

	function setup() {
		render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		);

		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/^hasło$/i);
		const repeatPassword = screen.getByLabelText(/^hasło ponownie$/i);
		const registerBtn = screen.getByRole("button", {
			name: /zarejestruj się/i,
		});
		const loginLink = screen.getByRole("link", { name: /zaloguj się/i });
		const form = screen.getByTestId("register-form");

		return {
			email,
			password,
			repeatPassword,
			registerBtn,
			loginLink,
			form,
		};
	}

	it("shows error message and prevents registration when passwords are different", async () => {
		const { email, password, repeatPassword, form } = setup();

		fireEvent.change(email, { target: { value: correctEmail } });
		fireEvent.change(password, { target: { value: correntPassword } });
		fireEvent.change(repeatPassword, {
			target: { value: correntPassword + "notMatching" },
		});

		const samePasswordMsg = screen.queryByText(passwordsSameMessage);
		const diffrentPasswordMsg = screen.queryByText(passwordsNotSameMessage);

		expect(samePasswordMsg).not.toBeInTheDocument();
		expect(diffrentPasswordMsg).toBeInTheDocument();

		fireEvent.submit(form);

		await waitFor(() => {
			expect(supabase.auth.signUp).not.toHaveBeenCalled();
		});
	});

	it("successfully registers when passwords match and email is valid", async () => {
		const { email, password, repeatPassword, form } = setup();

		fireEvent.change(email, { target: { value: correctEmail } });
		fireEvent.change(password, { target: { value: correntPassword } });
		fireEvent.change(repeatPassword, {
			target: { value: correntPassword },
		});

		const samePasswordMsg = screen.queryByText(passwordsSameMessage);
		const diffrentPasswordMsg = screen.queryByText(passwordsNotSameMessage);

		expect(samePasswordMsg).toBeInTheDocument();
		expect(diffrentPasswordMsg).not.toBeInTheDocument();

		fireEvent.submit(form);

		await waitFor(() => {
			expect(supabase.auth.signUp).toHaveBeenCalledWith({
				email: correctEmail,
				password: correntPassword,
			});
		});
	});
});
