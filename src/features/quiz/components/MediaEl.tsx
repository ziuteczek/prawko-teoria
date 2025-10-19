import { useEffect, useRef } from "react";

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
	isAnswering,
	isVideoPlaying,
	setIsVideoPlaying,
}: {
	src?: string;
	mediaType: "image" | "video" | "none";
	isAnswering: boolean;
	isVideoPlaying: boolean;
	setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const videoPlayed = useRef<boolean>(false);

	useEffect(() => {
		if (!isAnswering) {
			return;
		}
		videoPlayed.current = false;
	}, [isAnswering]);

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
				src={src}
				onClick={(e) => handleVideoPlay(e, videoPlayed)}
				onPlay={() => setIsVideoPlaying(true)}
				onEnded={() => setIsVideoPlaying(false)}
			/>
		);
	}

	return <img src={src} alt="" />;
}
