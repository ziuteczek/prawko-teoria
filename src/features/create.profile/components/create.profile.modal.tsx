import {
	useContext,
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";
import supabase from "../../../utils/supabase";
import  AuthContext  from "../../../context/auth.context";
import { useNavigate, useSearchParams } from "react-router";
import randomUsername from "../assets/random.username.json";
import profilePicturesFilenames from "../assets/profile.pictures.names.json";
import type { userProfilesInsert } from "../create.profile.types";
import SelectAvatar from "./select.avatar";

export default function CreaeteProfileModal({
	showModal,
	setShowModal,
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
	const dialogEl = useRef<HTMLDialogElement>(null);
	const redirect = useNavigate();
	const { user } = useContext(AuthContext);

	const [urlSearchParams] = useSearchParams();

	const [userProfileData, setUserProfileData] = useState<userProfilesInsert>({
		username: "",
		profile_picture_path: "",
	});

	useEffect(() => {
		if (!user) {
			redirect("/login");
			return;
		}

		(async () => {
			const { data: profileData } = await supabase
				.from("profiles")
				.select("user_id")
				.eq("user_id", user.id)
				.limit(1)
				.maybeSingle();

			if (profileData?.user_id) {
				setShowModal(false);
			} else {
				setShowModal(true);
			}
		})();
	}, [user, redirect, urlSearchParams, setShowModal]);

	useEffect(() => {
		const hasProfile = urlSearchParams.get("has_profile") === "true";

		if (hasProfile) {
			setShowModal(true);
		}
	}, [urlSearchParams, setShowModal]);

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

	const handleRandomProfileCreation = async () => {
		const userProfilePicture = getRandomProfilePicture();
		const userUsername = getRandomUsername();
		console.log(userProfilePicture,userUsername)
		await handleProfileCreation(userUsername, userProfilePicture);
	};

	const handleProfileCreation = async (
		username: string,
		profilePicturePath: string
	) => {
		const { error } = await supabase.from("profiles").insert({
			username: username,
			profile_picture_path: profilePicturePath,
			user_id: user.id,
		});

		if (error) {
			console.error(error);
		}

		setShowModal(false);
	};

	const getRandomUsername = () => {
		let randomUsernameIndex: number;

		do {
			randomUsernameIndex = Math.floor(
				Math.random() * randomUsername.length
			);
		} while (
			randomUsername[randomUsernameIndex] === userProfileData.username
		);

		return randomUsername[randomUsernameIndex];
	};

	const getRandomProfilePicture = () => {
		let randomProfilePictureIndex: number;

		do {
			randomProfilePictureIndex = Math.floor(
				Math.random() * profilePicturesFilenames.length
			);
		} while (
			profilePicturesFilenames[randomProfilePictureIndex] ===
			userProfileData.profile_picture_path
		);

		return profilePicturesFilenames[randomProfilePictureIndex];
	};

	return (
		<dialog ref={dialogEl}>
			<h3>Stwórz swój własny profil!</h3>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleProfileCreation(
						userProfileData.username,
						userProfileData.profile_picture_path as string
					);
				}}
			>
				<SelectAvatar
					userProfileData={userProfileData}
					setUserProfileData={setUserProfileData}
				/>

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
				<button
					type="button"
					onClick={() =>
						setUserProfileData((prev) => ({
							...prev,
							username: getRandomUsername(),
						}))
					}
				>
					losowa nazwa
				</button>
				<button
					type="button"
					onClick={() =>
						setUserProfileData((prev) => ({
							...prev,
							profile_picture_path: getRandomProfilePicture(),
						}))
					}
				>
					losowy avatar
				</button>

				<button type="submit">Stwórz</button>
				<button type="button" onClick={handleRandomProfileCreation}>
					Wyjdź (wygeneruj losowo)
				</button>
			</form>

			<button onClick={() => supabase.auth.signOut()}>wyloguj</button>
		</dialog>
	);
}
