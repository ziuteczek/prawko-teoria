import { useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "../../utils/supabase";

export default function Logout() {
	const redirect = useNavigate();

	useEffect(() => {
		supabase.auth.signOut().then(() => redirect("/login"));
	}, [redirect]);

	return <></>;
}
