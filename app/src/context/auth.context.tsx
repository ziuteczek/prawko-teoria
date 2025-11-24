import { createContext } from "react";
import type { authData } from "../types/global.types";

const AuthContext = createContext<authData>({
	user: null,
	session: null,
	loading: false,
});
export default AuthContext;
