import { useCallback, useState, type ReactNode } from "react";

import type { popupData } from "../types/global.types";
import PopupContext from "../context/popup.context";

export type popupType = "error";

const sleep = async (time: number) =>
	await new Promise((resolve) => setTimeout(resolve, time));

export function PopupProvider({ children }: { children: ReactNode }) {
	const [popupData, setPopupData] = useState<popupData[]>([]);

	const popupTypeToColor = useCallback((type: popupType) => {
		switch (type) {
			case "error":
				return "red";
		}
	}, []);

	const addPopup = useCallback(
		async (title: string, text: string, type: popupType) => {
			const popupColor = popupTypeToColor(type);

			const popupId = Date.now();

			setPopupData((prev) => [
				...prev,
				{ id: popupId, title, text, color: popupColor, duration: 5000 },
			]);

			await sleep(5000);

			setPopupData((prev) =>
				prev.filter((popup) => popup.id !== popupId)
			);
		},
		[popupTypeToColor]
	);

	return (
		<PopupContext.Provider value={{ popupData, addPopup }}>
			{children}
		</PopupContext.Provider>
	);
}
