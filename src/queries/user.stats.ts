import supabase from "../utils/supabase";

export async function getUserCategoryStats(profileId: string) {
	// 1️⃣ Get all questions and categories
	const { data: questions, error: qError } = await supabase
		.from("questions")
		.select("id, correct_answer, question_type_id");

	if (qError) throw qError;

	// 2️⃣ Get user's answers
	const { data: answers, error: aError } = await supabase
		.from("answers")
		.select("question_id, answer")
		.eq("profile_id", profileId);

	if (aError) throw aError;

	// 3️⃣ Get all categories
	const { data: categories, error: cError } = await supabase
		.from("category")
		.select("id, title");

	if (cError) throw cError;

	// 4️⃣ Build user_answers map
	const userAnswers = answers.map((a) => {
		const question = questions.find((q) => q.id === a.question_id);
		return {
			question_id: a.question_id,
			answer: a.answer,
			correct_answer: question?.correct_answer,
			is_correct: a.answer === question?.correct_answer,
		};
	});

	// 5️⃣ Aggregate stats per category
	const stats = categories.map((c) => {
		const categoryQuestions = questions.filter(
			(q) => q.question_type_id === c.id
		);

		const known = categoryQuestions.filter((q) =>
			userAnswers.some((ua) => ua.question_id === q.id && ua.is_correct)
		).length;

		const unknown = categoryQuestions.filter((q) =>
			userAnswers.some(
				(ua) => ua.question_id === q.id && ua.is_correct === false
			)
		).length;

		const total = categoryQuestions.length;
		const undiscovered = total - known - unknown;

		return {
			category_id: c.id,
			category_title: c.title,
			known_questions: known,
			unknown_questions: unknown,
			undiscovered_questions: undiscovered,
		};
	});

	// 6️⃣ Sort and return
	stats.sort((a, b) => a.category_id - b.category_id);
	return stats;
}