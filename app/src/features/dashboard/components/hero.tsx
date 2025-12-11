import { useContext, useEffect, useState } from "react";
import CatWaving from "../assets/cat-waving.svg?react";
import supabase from "../../../utils/supabase";
import AuthContext from "../../../context/auth.context";
import SlotCounter from "react-slot-counter";
export default function HeroDashboard() {
	const { user } = useContext(AuthContext);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const username = localStorage.getItem("username");

		if (!username) {
			return;
		}

		setUsername(username);
	}, []);

	useEffect(() => {
		if (!user?.id) {
			return;
		}

		(async () => {
			const { data, error } = await supabase
				.from("profiles")
				.select("username")
				.eq("user_id", user.id)
				.limit(1)
				.single();

			if (error) {
				console.error(error);
				return;
			}

			setUsername(data.username);
			localStorage.setItem("username", data.username);
		})();
	}, [user?.id]);

	return (
		<header className="flex justify-center border-b-5 border-b-blue-600 mb-5">
			<CatWaving className="max-w-100 max-h-100 -translate-x-5" />
			<div className="flex flex-col justify-center gap-5 text-4xl">
				<p>
					Witaj{" "}
					<span className="font-bold decoration-5 decoration-amber-600 underline text-blue-600">
						{username}
					</span>
				</p>
				<p>
					Udało ci się opanować już{" "}
					<span className="font-bold decoration-5 text-blue-600">
						<SlotCounter value={511} duration={3} />
					</span>{" "}
					pytania!
				</p>
			</div>
		</header>
	);
}
