import { useEffect, useState } from "react";
import "../../styles/AlertPopupAnimations.css";

export type popupType = "error" | "info";

export default function AlertPopup({
	title,
	text,
	type,
	duration,
}: {
	title: string;
	text: string;
	type: popupType;
	duration: number;
}) {
	const [showPopUp, setShowPopUp] = useState<boolean>(false);

	const getStylesClasses = (alertType: popupType) => {
		switch (alertType) {
			case "error":
				return {
					borderColor: "border-red-800",
					backgroundColor: "bg-red-100",
					stripColor: "bg-red-500",
				};
			case "info":
				return {
					borderColor: "border-black",
					backgroundColor: "bg-white",
					stripColor: "bg-blue-500",
				};
		}
	};

	const popupStyles = getStylesClasses(type);

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
		<div
			className={`fixed top-20 right-0 max-w-75 w-full border border-r-0 ${popupStyles.borderColor} ${popupStyles.backgroundColor} rounded-l-md overflow-clip`}
			style={{ animation: `hiding-animation ${duration}ms linear` }}
		>
			<div className="p-3">
				<h3 className="font-bold">{title}</h3>
				<p>{text}</p>
			</div>
			<div
				className={`absolute bottom-0 left-0 right-0 h-2 origin-left ${popupStyles.stripColor}`}
				style={{
					animation: `scaling-animation ${duration}ms linear`,
				}}
			></div>
		</div>
	);
}
