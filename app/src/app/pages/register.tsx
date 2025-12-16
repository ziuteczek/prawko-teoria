import { useState } from "react";
import type { registerData } from "../../types/login.types";
import supabase from "../../utils/supabase";
import { Link } from "react-router";
import GoogleIcon from "../assets/google-icon.svg?react";
import FacebookIcon from "../assets/facebook-icon.svg?react";
import BackArrow from "../assets/arrow-back.svg?react";
import logo from "../assets/logo.png";
import { signInFacebook, signInGoogle } from "../../utils/auth";
import AlertPopup from "../components/AlertPopup";

import "../../styles/scaling-animation.css";

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

	function GetPasswordsMatchingEl() {
		if (!registerData.password) {
			return <></>;
		}

		if (registerData.password === registerData.passwordConfirmation) {
			return <></>;
		} else {
			return <p>Hasła nie są takie same</p>;
		}
	}

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
		<>
			<a
				href="%VITE_HOME_PAGE_URL%"
				className="absolute top-5 left-5 text-2xl uppercase flex justify-center items-center gap-3"
			>
				<BackArrow className="max-w-5 max-h-5" /> <span>strona główna</span>
			</a>
			<form
				onSubmit={registerUser}
				data-testid="register-form"
				className="flex flex-col h-svh justify-center items-center gap-3"
			>
				<h1 className="font-bold text-2xl">Rejestracja</h1>
				<img
					src={logo}
					alt="prawko-teoria.pl logo"
					className="max-w-30 max-h-30"
				/>
				<div className="flex flex-col max-w-65 w-full ">
					<label className="text-sm font-bold " htmlFor="email">
						email
					</label>
					<input
						className="border"
						type="email"
						name="email"
						id="email"
						value={registerData.email}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col max-w-65 w-full ">
					<label className="text-sm font-bold " htmlFor="password">
						hasło
					</label>
					<input
						className="border"
						type="password"
						name="password"
						id="password"
						value={registerData.password}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col max-w-65 w-full ">
					<label className="text-sm font-bold " htmlFor="password-repeat">
						hasło ponownie
					</label>
					<input
						className="border"
						type="password"
						name="passwordConfirmation"
						id="password-repeat"
						value={registerData.passwordConfirmation}
						onChange={handleChange}
					/>
				</div>
				<GetPasswordsMatchingEl />
				<button
					className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2.5 disabled:cursor-not-allowed hover:disabled:bg-gray-400 cursor-pointer"
					type="submit"
					disabled={
						!registerData.email ||
						!registerData.password ||
						!registerData.passwordConfirmation ||
						registerData.password !== registerData.passwordConfirmation
					}
				>
					Zarejestruj się
				</button>
				<p className="">
					Zamiast tego{" "}
					<Link className="text-blue-600 hover:text-blue-800" to="/login">
						zaloguj się
					</Link>
					.
				</p>
				<div className="flex justify-between gap-5">
					<button
						type="button"
						onClick={(e) => signInGoogle(e)}
						className="px-5 py-2.5 border rounded cursor-pointer border-gray-300 hover:bg-gray-100 transition-colors"
					>
						<GoogleIcon className="max-w-10 max-h-10" />
					</button>
					<button
						type="button"
						onClick={(e) => signInFacebook(e)}
						className="px-5 py-2.5 border rounded cursor-pointer border-gray-300 hover:bg-gray-100 transition-colors"
					>
						<FacebookIcon className="max-w-10 max-h-10" />
					</button>
				</div>
			</form>
			<AlertPopup duration={150000} text="elo" title="zelo" color="red" />
		</>
	);
}
