import { useContext, useEffect, useRef, useState } from "react";
import supabase from "../../../utils/supabase";
import { AuthContext } from "../../../context/auth.context";
import { useNavigate, useSearchParams } from "react-router";
import randomUsername from "../assets/random.username.json";
import profilePicturesFilenames from "../assets/profile.pictures.names.json";

import type { userProfilesInsert } from "../create.profile.types";
import { PROFILE_PICTURE_PATH } from "../config";

export default function CreaeteProfileModal() {
	const dialogEl = useRef<HTMLDialogElement>(null);
	const redirect = useNavigate();
	const { user } = useContext(AuthContext);

	const [urlSearchParams] = useSearchParams();

	const [userProfileData, setUserProfileData] = useState<userProfilesInsert>({
		username: "",
		profile_picture_path: "",
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
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const { username, profile_picture_path } = userProfileData;

		const { error } = await supabase
			.from("profiles")
			.update({
				username: username,
				profile_picture_path: profile_picture_path || "",
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
		} while (
			randomUsername[randomUsernameIndex] === userProfileData.username
		);

		setUserProfileData((prev) => ({
			...prev,
			username: randomUsername[randomUsernameIndex],
		}));
	};

	const setRandomProfilePicture = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		let randomProfilePictureIndex: number;

		do {
			randomProfilePictureIndex = Math.floor(
				Math.random() * profilePicturesFilenames.length
			);
		} while (
			profilePicturesFilenames[randomProfilePictureIndex] ===
			userProfileData.profile_picture_path
		);

		setUserProfileData((prev) => ({
			...prev,
			profile_picture_path:
				profilePicturesFilenames[randomProfilePictureIndex],
		}));
	};

	return (
		<dialog ref={dialogEl}>
			<h3>Stwórz swój własny profil!</h3>
			<form onSubmit={(e) => handleProfileCreation(e)}>
				{profilePicturesFilenames.map((filename) => (
					<>
						<label htmlFor={"profile-picture-" + filename}>
							<img
								src={PROFILE_PICTURE_PATH + filename}
								alt={filename.replace(".webp", "")}
							/>
						</label>
						<input
							type="radio"
							name="profile-picture"
							checked={
								userProfileData.profile_picture_path ===
								filename
							}
							onChange={() =>
								setUserProfileData((prev) => ({
									...prev,
									profile_picture_path: filename,
								}))
							}
							id={"profile-picture-" + filename}
						/>
					</>
				))}

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
				<button onClick={(e) => setRandomProfilePicture(e)}>
					losowy avater
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
