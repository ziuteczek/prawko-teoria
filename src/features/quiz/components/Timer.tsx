export default function Timer({
	seconds,
	isAnswering,
}: {
	seconds: number;
	isAnswering: boolean;
}) {
	return isAnswering ? <p>{seconds}</p> : <></>;
}
