import { useState } from "react";
import type { registerData } from "../../types/login.types";
import supabase from "../../utils/supabase";
import { Link } from "react-router";

export default function Register() {
	const [registerData, setRegisterData] = useState<registerData>({
		email: "",
		password: "",
		passwordConfirmation: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRegisterData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const getPasswordsMatchingEl = () => {
		if (!registerData.password) {
			return <p></p>;
		}

		if (registerData.password === registerData.passwordConfirmation) {
			return <p>Hasla są takie same</p>;
		} else {
			return <p>Hasła nie są takie same</p>;
		}
	};

	const registerUser = async (e: React.FormEvent) => {
		e.preventDefault();

		if (registerData.password !== registerData.passwordConfirmation) {
			alert("Password aren't matching");
			return;
		}

		const { email, password } = registerData;
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			alert(error.message);
		}
	};

	const registerUserFacebook = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const { error } = await supabase.auth.signInWithOAuth({
			provider: "facebook",
		});

		if (error) {
			alert(error.message);
		}
	};

	const registerUserGoogle = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: "/dashboard?has_profile=true",
			},
		});

		if (error) {
			alert(error.message);
		}
	};

	return (
		<form onSubmit={registerUser} data-testid="register-form">
			<label htmlFor="email">email</label>
			<input
				type="email"
				name="email"
				id="email"
				value={registerData.email}
				onChange={handleChange}
			/>

			<label htmlFor="password">hasło</label>
			<input
				type="password"
				name="password"
				id="password"
				value={registerData.password}
				onChange={handleChange}
			/>

			{getPasswordsMatchingEl()}
			<label htmlFor="password-repeat">hasło ponownie</label>
			<input
				type="password"
				name="passwordConfirmation"
				id="password-repeat"
				value={registerData.passwordConfirmation}
				onChange={handleChange}
			/>

			<button type="submit">Zarejestruj się</button>
			<Link to="/login">zaloguj się</Link>
			<button type="button" onClick={(e) => registerUserFacebook(e)}>
				fejsbuk
			</button>
			<button type="button" onClick={(e) => registerUserGoogle(e)}>
				Google
			</button>
		</form>
	);
}
