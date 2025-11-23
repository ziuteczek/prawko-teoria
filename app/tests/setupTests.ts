import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});

export const correctEmail = "example@email.com";
export const correntPassword = "GoodPassword123@";
