import { useContext, useEffect, useRef, useState } from "react";
import supabase from "../../../utils/supabase";
import { AuthContext } from "../../../context/auth.context";
import { useNavigate, useSearchParams } from "react-router";
import randomUsername from "../assets/random.username.json";

import type { userProfilesInsert } from "../create.profile.types";

export default function CreaeteProfileModal() {
	const dialogEl = useRef<HTMLDialogElement>(null);
	const redirect = useNavigate();
	const { user } = useContext(AuthContext);
	const lastRandomUsername = useRef<number | null>(null);

	const [urlSearchParams] = useSearchParams();

	const [userProfileData, setUserProfileData] = useState<userProfilesInsert>({
		username: "",
	});
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (!user) {
			redirect("/login");
			return;
		}

		(async () => {
			const { data: profileData } = await supabase
				.from("profiles")
				.select("username")
				.eq("user_id", user.id)
				.limit(1)
				.single();

			if (profileData?.username === "") {
				setShowModal(true);
			} else {
				setShowModal(false);
			}
		})();
	}, [user, redirect, urlSearchParams]);

	useEffect(() => {
		const hasProfile = urlSearchParams.get("has_profile") === "true";

		if (hasProfile) {
			setShowModal(true);
		}
	}, [urlSearchParams]);

	useEffect(() => {
		if (showModal) {
			dialogEl.current?.showModal();
		} else {
			dialogEl.current?.close();
		}
	}, [showModal]);

	if (!user) {
		return null;
	}

	const handleProfileCreation = async (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const { username } = userProfileData;

		const { error } = await supabase
			.from("profiles")
			.update({
				username: username,
			})
			.eq("user_id", user.id);

		if (error) {
			console.error(error);
		}

		setShowModal(false);
	};

	const setRandomUsername = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		let randomUsernameIndex: number;

		do {
			randomUsernameIndex = Math.floor(
				Math.random() * randomUsername.length
			);
		} while (randomUsernameIndex === lastRandomUsername.current);

		setUserProfileData((prev) => ({
			...prev,
			username: randomUsername[randomUsernameIndex],
		}));
		lastRandomUsername.current = randomUsernameIndex;
	};

	return (
		<dialog ref={dialogEl}>
			<h3>Stwórz swój własny profil!</h3>
			<form onSubmit={(e) => handleProfileCreation(e)}>
				<label htmlFor="username">Nazwa użytkownika</label>
				<input
					type="text"
					name="username"
					id="username"
					maxLength={20}
					minLength={4}
					required
					onChange={(e) =>
						setUserProfileData((old) => ({
							...old,
							username: e.target.value,
						}))
					}
					value={userProfileData.username}
				/>
				<button onClick={(e) => setRandomUsername(e)}>
					losowa nazwa
				</button>
				<button type="submit">Stwórz</button>
				<button
					onClick={(e) => {
						setRandomUsername(e);
						handleProfileCreation(e);
					}}
				>
					Wyjdź (wygeneruj losowo)
				</button>
			</form>

			<button onClick={() => supabase.auth.signOut()}>wyloguj</button>
		</dialog>
	);
}
