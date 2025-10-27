export default function Timer({
	seconds,
	isAnswering,
	isVideoPlaying,
}: {
	seconds: number;
	isAnswering: boolean;
	isVideoPlaying: boolean;
}) {
	return isAnswering ? <p>{isVideoPlaying ? 15 : seconds}</p> : <></>;
}
