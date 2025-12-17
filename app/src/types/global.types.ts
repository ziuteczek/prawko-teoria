import type { User, Session } from "@supabase/supabase-js";
import type { questionDataPromise } from "../features/quiz/utility/promisifyQuestion";
import type { popupType } from "../app/components/AlertPopup";

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
export interface popupData {
	id: number;
	title: string;
	text: string;
	duration: number;
	type: popupType;
}
