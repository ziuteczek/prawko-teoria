import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth.context";
import { useNavigate } from "react-router";
import supabase from "../../../utils/supabase";
import CreaeteProfileModal from "../../../features/create.profile/components/create.profile.modal";
import type { Database } from "../../../types/database.types";
import CategoryStat from "./user-stat";

export type userCategoryStats =
	Database["public"]["Functions"]["get_user_stats"]["Returns"];

const getUserLocalStats = (): userCategoryStats | undefined => {
	const userStatsString = localStorage.getItem("user-stats");
	if (!userStatsString) {
		return;
	}
	try {
		return JSON.parse(userStatsString);
	} catch (err) {
		console.error(err);
		return;
	}
};

export default function Dashboard() {
	const [userStats, setUserStats] = useState<userCategoryStats>([]);
	const { user } = useContext(AuthContext);
	const redirect = useNavigate();
	const [createProfileModal, setCreateProfileModal] = useState(false);

	useEffect(() => {
		if (!user) {
			redirect("/");
			return;
		}

		const localUserStats = getUserLocalStats();
		if (localUserStats) {
			setUserStats(localUserStats);
		}

		supabase
			.rpc("get_user_stats", { p_user_id: user.id })
			.then(({ data, error }) => {
				if (error) {
					throw new Error(error.message);
				}

				setUserStats(data);
				localStorage.setItem("user-stats", JSON.stringify(data));
			});
	}, [user, redirect, createProfileModal]);

	if (!user) {
		return null;
	}

	return (
		<>
			<h1 className="text-4xl mb-3 font-bold">Dashboard</h1>
			<CreaeteProfileModal
				showModal={createProfileModal}
				setShowModal={setCreateProfileModal}
			/>
			{userStats.map((userStat) => (
				<CategoryStat userStat={userStat} key={userStat.categoryId} />
			))}
		</>
	);
}
