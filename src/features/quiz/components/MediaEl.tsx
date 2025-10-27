import { useEffect, useRef } from "react";
import type { QuizStage } from "../types";

const handleVideoPlay = (
	e: React.MouseEvent<HTMLVideoElement, MouseEvent>,
	videoPlayed: React.RefObject<boolean>
) => {
	videoPlayed.current || (e.target as HTMLVideoElement).play();
	videoPlayed.current = true;
};

export default function MediaEl({
	src,
	mediaType,
	quizStage,
	isVideoPlaying,
	setIsVideoPlaying,
}: {
	src?: string;
	mediaType: "image" | "video" | "none";
	quizStage: QuizStage;
	isVideoPlaying: boolean;
	setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const videoPlayed = useRef<boolean>(false);
	const videoElRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		setIsVideoPlaying(false);
	}, [src]);

	useEffect(() => {
		if (isVideoPlaying) {
			videoElRef.current?.play();
		} else {
			videoElRef.current?.pause();
		}
	}, [isVideoPlaying]);

	useEffect(() => {
		if (quizStage !== "explanation") {
			return;
		}
		videoPlayed.current = false;
	}, [quizStage]);

	if (!mediaType) {
		return (
			<img
				src="https://www.shutterstock.com/image-illustration/no-image-photo-template-on-260nw-2095008103.jpg"
				alt=""
			/>
		);
	}

	if (mediaType === "video") {
		return (
			<video
				ref={videoElRef}
				src={src}
				onClick={(e) => handleVideoPlay(e, videoPlayed)}
				onPlay={() => setIsVideoPlaying(true)}
				onEnded={() => setIsVideoPlaying(false)}
			/>
		);
	}

	return <img src={src} alt="" />;
}
