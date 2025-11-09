import { useState, type ReactNode } from "react";
import { PreloadContext } from "../context/preload.context";
import type { questionDataPromise } from "../features/quiz/utility/promisifyQuestion";

export function PreloadProvider({ children }: { children: ReactNode }) {
	const [preloadData, setPreloadData] = useState<questionDataPromise[]>([]);

	return (
		<PreloadContext.Provider value={{ preloadData, setPreloadData }}>
			{children}
		</PreloadContext.Provider>
	);
}
