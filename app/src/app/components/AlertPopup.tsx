import { useEffect, useState } from "react";
import "../../styles/AlertPopupAnimations.css";

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
		<div className="fixed top-20 right-0 max-w-75 w-full border border-r-0 border-red-800 rounded-l-md bg-red-100 overflow-clip">
			<div className="p-3">
				<h3 className="font-bold">{title}</h3>
				<p>{text}</p>
			</div>
			<div
				className="absolute bottom-0 left-0 right-0 h-2 origin-left"
				style={{
					animation: `scaling-animation ${duration}ms linear`,
					backgroundColor: color,
				}}
			></div>
		</div>
	);
}
