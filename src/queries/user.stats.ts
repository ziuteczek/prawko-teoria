import supabase from "../utils/supabase";

export async function getUserCategoryStats(profileId: string) {
  // 1️⃣ Get all questions
  const { data: questions, error: qError } = await supabase
    .from("questions")
    .select("id, correct_answer, category_id");
  if (qError) throw qError;

  // 2️⃣ Get user's answers
  const { data: answers, error: aError } = await supabase
    .from("answers")
    .select("question_id, answer")
    .eq("profile_id", profileId);
  if (aError) throw aError;

  // 3️⃣ Get categories
  const { data: categories, error: cError } = await supabase
    .from("categories")
    .select("id, title");
  if (cError) throw cError;

  // 4️⃣ Map user answers
  const userAnswerMap = new Map(
    answers.map(a => [a.question_id, { ...a, is_correct: false }])
  );

  questions.forEach(q => {
    const ua = userAnswerMap.get(q.id);
    if (ua) ua.is_correct = ua.answer === q.correct_answer;
  });

  // 5️⃣ Aggregate stats
  const stats = categories.map(c => {
    const categoryQuestions = questions.filter(q => q.category_id === c.id);

    let known = 0, unknown = 0;
    for (const q of categoryQuestions) {
      const ua = userAnswerMap.get(q.id);
      if (!ua) continue;
      if (ua.is_correct) known++;
      else unknown++;
    }

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

  stats.sort((a, b) => a.category_id - b.category_id);
  return stats;
}
