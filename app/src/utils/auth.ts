import supabase from "./supabase";

export const signInFacebook = async (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
	e.preventDefault();

	const { error } = await supabase.auth.signInWithOAuth({
		provider: "facebook",
	});

	if (error) {
		alert(error.message);
	}
};

export const signInGoogle = async (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
	e.preventDefault();

	const { error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: "/dashboard?has_profile=true",
		},
	});

	if (error) {
		alert(error.message);
	}
};