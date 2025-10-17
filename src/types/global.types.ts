import type { User, Session } from "@supabase/supabase-js";
import type { questionDataPromise } from "./questions.types";


export interface authData {
    user: User | null;
    session: Session | null;
    loading: boolean;
}
export interface preloadObj {
    preloadData: questionDataPromise[] | null;
    setPreloadData: React.Dispatch<
        React.SetStateAction<questionDataPromise[]>
    > | null;
}