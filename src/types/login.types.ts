import type { User, Session } from "@supabase/supabase-js";

export interface loginData {
    email: string;
    password: string;
    keepLogin: boolean;
}
export interface registerData {
    email: string;
    password: string;
    passwordConfirmation: string;
}
export interface authData {
    user: User | null;
    session: Session | null;
    loading: boolean;
}
