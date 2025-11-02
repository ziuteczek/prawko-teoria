import profilePicturesFilenames from "../assets/profile.pictures.names.json";
import { Fragment } from "react/jsx-runtime";
import { PROFILE_PICTURE_PATH } from "../../../config/cloud.storage";
import type { userProfilesInsert } from "../create.profile.types";
import type { Dispatch, SetStateAction } from "react";

export default function SelectAvatar({
	userProfileData,
	setUserProfileData,
}: {
	userProfileData: userProfilesInsert;
	setUserProfileData: Dispatch<SetStateAction<userProfilesInsert>>;
}) {
	return (
		<>
			{profilePicturesFilenames.map((filename) => (
				<Fragment key={filename}>
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
							userProfileData.profile_picture_path === filename
						}
						onChange={() =>
							setUserProfileData((prev) => ({
								...prev,
								profile_picture_path: filename,
							}))
						}
						id={"profile-picture-" + filename}
					/>
				</Fragment>
			))}
		</>
	);
}
