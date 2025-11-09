import supabase from "./supabase";

export default async function getPendingQuestions(
	userId: string,
	categoryID: number,
	limit: number = 5,
	questionsToIgnore: number[] = []
) {
	const { data, error } = await supabase.rpc(
		"get_incorrect_or_unanswered_questions",
		{
			p_profile_id: userId,
			p_category_id: categoryID,
			p_limit: limit,
			p_question_ignore: questionsToIgnore,
		}
	);

	if (error) {
		console.error("Error fetching pending questions:", error);
		return [];
	}

	return data;
}
