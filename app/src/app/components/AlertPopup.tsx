import { useEffect, useState } from "react";

export default function AlertPopup({
	title,
	text,
	color,
	duration,
}: {
	title: string;
	text: string;
	color: string;
	duration: number;
}) {
	const [showPopUp, setShowPopUp] = useState<boolean>(false);

	useEffect(() => {
		setShowPopUp(true);

		const hideTimeout = setTimeout(() => {
			setShowPopUp(false);
		}, duration);

		return () => {
			setShowPopUp(false);
			clearTimeout(hideTimeout);
		};
	}, [duration]);

	if (!showPopUp) {
		return <></>;
	}

	return (
		<div className="fixed top-20 right-0 max-w-75 w-full border border-r-0 border-stone-400 rounded-l-md">
			<div className="p-3">
				<h3 className="font-bold">{title}</h3>
				<p>{text}</p>
			</div>
			<div
				className="absolute bottom-0 left-0 right-0 h-2"
				style={{
					animation: `scaling-animation ${duration}ms`,
					backgroundColor: color,
				}}
			></div>
		</div>
	);
}
