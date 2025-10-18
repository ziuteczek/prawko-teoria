export default function MediaEl({
	src,
	mediaType,
}: {
	src?: string;
	mediaType: "image" | "video" | "none";
}) {
	if (!mediaType) {
		return (
			<img src="https://www.shutterstock.com/image-illustration/no-image-photo-template-on-260nw-2095008103.jpg" />
		);
	}

	if (mediaType === "video") {
		return (
			<video
				src={src}
				onClick={(e) => (e.target as HTMLVideoElement).play()}
			/>
		);
	}

	return <img src={src} />;
}
