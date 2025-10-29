import { createContext } from "react";
import type { authData } from "../types/global.types";

export const AuthContext = createContext<authData>({
    user: null,
    session: null,
    loading: false,
});
