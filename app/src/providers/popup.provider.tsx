import { useCallback, useState, type ReactNode } from "react";

import type { popupData } from "../types/global.types";
import PopupContext from "../context/popup.context";
import type { popupType } from "../app/components/AlertPopup";

const sleep = async (time: number) =>
	await new Promise((resolve) => setTimeout(resolve, time));

export function PopupProvider({ children }: { children: ReactNode }) {
	const [popupData, setPopupData] = useState<popupData[]>([]);

	const addPopup = useCallback(
		async (title: string, text: string, type: popupType) => {
			const popupId = Date.now();

			setPopupData((prev) => [
				...prev,
				{
					id: popupId,
					title,
					text,
					duration: 5000,
					type,
				},
			]);

			await sleep(5000);

			setPopupData((prev) =>
				prev.filter((popup) => popup.id !== popupId)
			);
		},
		[]
	);

	return (
		<PopupContext.Provider value={{ popupData, addPopup }}>
			{children}
		</PopupContext.Provider>
	);
}
