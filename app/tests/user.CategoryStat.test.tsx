import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { CategoryStat, userCategoryStats } from "../src/app/pages/dashboard";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PreloadContext } from "../src/context/preload.context";
import AuthContext from "../src/context/auth.context";
import { Session, User } from "@supabase/supabase-js";
import { questionsRaw } from "../src/utils/questions";
import React from "react";
import { questionDataPromise } from "../src/types/questions.types";
import { QUESTIONS_TO_PRELOAD } from "../src/config/questions";

type userStat = userCategoryStats[number];

vi.mock("react-intersection-observer", () => ({
	useInView: vi.fn().mockReturnValue({
		inView: true,
		ref: vi.fn(),
	}),
}));

vi.mock("../src/utils/questions", () => ({
	default: vi.fn(async (_, __, questionsToPreload: number) =>
		new Array(questionsToPreload).fill(null).map((___, i) => ({
			categoryID: i + 1,
		}))
	),
}));

vi.mock("../src/features/quiz/utility/promisifyQuestion", () => ({
	default: (q: questionsRaw) => q,
}));

describe("Category stat element", () => {
	const setup = (stats?: userStat) => {
		const userStat: userStat = {
			categoryId: 0,
			categoryTitle: "Category title",
			correctAnswers: 5,
			incorrectAnswers: 3,
			totalQuestions: 20,
		};

		const preloadData: { data: questionDataPromise[] } = { data: [] };

		const setPreloadData = vi.fn(
			(updater: React.SetStateAction<questionDataPromise[]>) => {
				if (typeof updater === "function") {
					preloadData.data = updater(preloadData.data);
				} else {
					preloadData.data = updater;
				}
			}
		);

		render(
			<MemoryRouter>
				<PreloadContext.Provider
					value={{ preloadData: preloadData.data, setPreloadData }}
				>
					<AuthContext.Provider
						value={{
							user: { id: "test-user-id" } as User,
							session: {} as Session,
							loading: false,
						}}
					>
						<CategoryStat userStat={userStat || stats} />
					</AuthContext.Provider>
				</PreloadContext.Provider>
			</MemoryRouter>
		);

		return {
			userStat,
			setPreloadData,
			preloadData,
		};
	};

	it("User stat is rendering", async () => {
		const { userStat: stats } = setup();

		const categoryTitleRegex = new RegExp(stats.categoryTitle, "i");
		expect(screen.getByText(categoryTitleRegex)).toBeInTheDocument();

		const unkownQuestionsRegex = new RegExp(
			`Pytania nieznane: ${stats.incorrectAnswers}`,
			"i"
		);
		expect(screen.getByText(unkownQuestionsRegex)).toBeInTheDocument();

		const knowQuestionsRegex = new RegExp(
			`Pytania znane: ${stats.correctAnswers}`,
			"i"
		);
		expect(screen.getByText(knowQuestionsRegex)).toBeInTheDocument();

		const undiscoveredQuestions =
			stats.totalQuestions -
			stats.correctAnswers -
			stats.incorrectAnswers;

		const unknownQuestionsRegex = new RegExp(
			`Pytania nieodkryte: ${undiscoveredQuestions}`,
			"i"
		);
		expect(screen.getByText(unknownQuestionsRegex)).toBeInTheDocument();

		expect(screen.getByRole("link", { name: /start/i })).toHaveAttribute(
			"href",
			`/quiz?category_id=${stats.categoryId}`
		);
	});

	it("Questions are preloading", async () => {
		const { setPreloadData, preloadData } = setup();

		await waitFor(() => {
			expect(setPreloadData).toBeCalled();
		});

		const preloadedQuestionsToExpect = new Array(QUESTIONS_TO_PRELOAD)
			.fill(null)
			.map((_, i) => ({ categoryID: i + 1 }));

		expect(preloadData.data).toEqual(preloadedQuestionsToExpect);
	});
});
