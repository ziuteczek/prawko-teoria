import supabase from "./supabase";

export async function getPendingQuestions(
	userId: string,
	categoryID: number,
	limit: number = 5,
	questionsToIgnore: number[] = []
) {
	const { data, error } = await supabase.rpc("get_quiz_questions", {
		pProfileId: userId,
		pCategoryId: categoryID,
		pLimit: limit,
		pIgnoreIds: questionsToIgnore,
	});

	if (error) {
		console.error("Error fetching pending questions:", error);
		return [];
	}

	return data;
}

export type questionsRaw = Awaited<
	ReturnType<typeof getPendingQuestions>
>[number];
