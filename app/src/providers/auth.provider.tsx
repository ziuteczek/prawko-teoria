import type { User, Session } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import supabase from "../utils/supabase";
import AuthContext from "../context/auth.context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const fetchDataSession = await supabase.auth.getSession();
			const sessionData = fetchDataSession.data.session;

			setSession(sessionData);
			setUser(sessionData?.user ?? null);
			setLoading(false);
		};

		fetchSession();

		const fetchDataSubscription = supabase.auth.onAuthStateChange(
			(_, session) => {
				setSession(session);
				setUser(session?.user ?? null);
				setLoading(false);
			}
		);

		const subscription = fetchDataSubscription.data.subscription;

		return () => subscription.unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, session, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
