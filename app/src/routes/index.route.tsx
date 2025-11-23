import { useEffect } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router";

export default function IndexRoute() {
	const navigator = useNavigate();

	useEffect(() => {
		(async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session?.user) {
				navigator("/dashboard");
				return;
			}
			navigator("/register");
		})();
	});

	return <></>;
}
