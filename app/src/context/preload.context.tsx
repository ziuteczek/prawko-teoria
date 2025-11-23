import { createContext } from "react";
import type { preloadObj } from "../types/global.types";

export const PreloadContext = createContext<preloadObj>({
    preloadData: null,
    setPreloadData: null,
});
