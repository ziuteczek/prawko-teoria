import type { questionData } from "../../../types/questions.types";
import ConfirmBtn from "./ConfirmBtn";
import MediaEl from "./MediaEl";

export default function Answer({
	questionData,
	isAnswering,
	setIsAnswering,
}: {
	questionData: questionData;
	isAnswering: boolean;
	setIsAnswering: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	questionData;

	return (
		<>
            <MediaEl src={questionData.mediaSrc} mediaType={questionData.mediaType} />
			<p>{questionData.content}</p>
			<ConfirmBtn
				isAnswering={isAnswering}
				setIsAnswering={setIsAnswering}
			/>
		</>
	);
}
