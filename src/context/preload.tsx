import { createContext, useState, type ReactNode } from "react";
import type { questionDataPromise } from "../types/questions.types";
import type { preloadObj } from "../types/global.types";

export const PreloadContext = createContext<preloadObj>({
	preloadData: null,
	setPreloadData: null,
});

export function PreloadProvider({ children }: { children: ReactNode }) {
	const [preloadData, setPreloadData] = useState<questionDataPromise[]>([]);

	return (
		<PreloadContext.Provider value={{ preloadData, setPreloadData }}>
			{children}
		</PreloadContext.Provider>
	);
}
