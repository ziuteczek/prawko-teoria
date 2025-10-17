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

	return (
		<form onSubmit={registerUser}>
			<label htmlFor="email">email</label>
			<input
				type="email"
				name="email"
				value={registerData.email}
				onChange={handleChange}
			/>

			<label htmlFor="password">hasło</label>
			<input
				type="password"
				name="password"
				value={registerData.password}
				onChange={handleChange}
			/>

			{getPasswordsMatchingEl()}
			<label htmlFor="passwordConfirmation">hasło ponownie</label>
			<input
				type="password"
				name="passwordConfirmation"
				value={registerData.passwordConfirmation}
				onChange={handleChange}
			/>

			<button type="submit">Zarejestruj się</button>
			<Link to="/login">zaloguj się</Link>
		</form>
	);
}
