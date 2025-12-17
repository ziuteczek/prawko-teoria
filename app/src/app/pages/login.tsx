import React, { useContext, useState } from "react";
import supabase from "../../utils/supabase";

import type { loginData } from "../../types/login.types";
import { Link, useNavigate } from "react-router";
import GoogleIcon from "../assets/google-icon.svg?react";
import FacebookIcon from "../assets/facebook-icon.svg?react";
import BackArrow from "../assets/arrow-back.svg?react";
import logo from "../assets/logo.png";
import { signInFacebook, signInGoogle } from "../../utils/auth";
import PopupContext from "../../context/popup.context";

export default function Login() {
	const redirect = useNavigate();
	const { addPopup } = useContext(PopupContext);

	const [loginData, setLoginData] = useState<loginData>({
		email: "",
		password: "",
		keepLogin: false,
	});

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email, password } = loginData;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error && addPopup) {
			addPopup("Błąd poczdczas logowania", error.message, "error");
		}

		if (error) {
			return;
		}
		await redirect("/dashboard");
	};

	return (
		<>
			<a
				href={import.meta.env.VITE_HOME_PAGE_URL}
				className="absolute top-5 left-5 text-2xl uppercase flex justify-center items-center gap-3"
			>
				<BackArrow className="max-w-5 max-h-5" />{" "}
				<span>strona główna</span>
			</a>
			<form
				onSubmit={(e) => handleLogin(e)}
				data-testid="register-form"
				className="flex flex-col h-svh justify-center items-center gap-3"
			>
				<h1 className="font-bold text-2xl">Logowanie</h1>
				<img
					src={logo}
					alt="prawko-teoria.pl logo"
					className="max-w-30 max-h-30"
				/>
				<div className="flex flex-col max-w-65 w-full">
					<label className="text-sm font-bold " htmlFor="email">
						email
					</label>
					<input
						className="border rounded py-0.5 px-1"
						id="email"
						type="email"
						value={loginData.email}
						onChange={(e) =>
							setLoginData({
								...loginData,
								email: e.target.value,
							})
						}
					/>
				</div>

				<div className="flex flex-col max-w-65 w-full">
					<label className="text-sm font-bold " htmlFor="password">
						hasło
					</label>
					<input
						className="border rounded py-0.5 px-1"
						id="password"
						type="password"
						value={loginData.password}
						onChange={(e) =>
							setLoginData({
								...loginData,
								password: e.target.value,
							})
						}
					/>
				</div>
				<div className="max-w-65 w-full">
					<input
						className="border rounded py-0.5 px-1"
						id="keepLogin"
						type="checkbox"
						checked={loginData.keepLogin}
						onChange={(e) =>
							setLoginData({
								...loginData,
								keepLogin: e.target.checked,
							})
						}
					/>
					<label
						className="text-sm font-bold ml-2.5"
						htmlFor="keepLogin"
					>
						nie wylogowuj
					</label>
				</div>
				<button
					className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2.5 disabled:cursor-not-allowed hover:disabled:bg-gray-400 cursor-pointer rounded"
					type="submit"
					disabled={!loginData.email || !loginData.password}
				>
					Zaloguj się
				</button>
				<p>
					Zamiast tego{" "}
					<Link
						className="text-blue-600 hover:text-blue-800"
						to="/register"
					>
						zarejestruj się
					</Link>
					.
				</p>
				<div className="flex justify-between gap-5">
					<button
						type="button"
						onClick={(e) => signInGoogle(e)}
						className="px-5 py-2.5 border rounded cursor-pointer border-gray-300 hover:bg-gray-200 transition-colors duration-300"
					>
						<GoogleIcon className="max-w-10 max-h-10" />
					</button>
					<button
						type="button"
						onClick={(e) => signInFacebook(e)}
						className="px-5 py-2.5 border rounded cursor-pointer border-gray-300 hover:bg-gray-200 transition-colors duration-300"
					>
						<FacebookIcon className="max-w-10 max-h-10" />
					</button>
				</div>
			</form>
		</>
	);
}
