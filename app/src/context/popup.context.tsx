import { createContext } from "react";
import type { popupData } from "../types/global.types";
import type { popupType } from "../providers/popup.provider";

const PopupContext = createContext<{
	popupData: popupData[];
	addPopup:
		| ((title: string, text: string, type: popupType) => Promise<void>)
		| null;
}>({
	popupData: [],
	addPopup: null,
});
export default PopupContext;
