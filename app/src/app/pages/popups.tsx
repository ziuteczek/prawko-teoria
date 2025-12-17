import { useContext } from "react";
import PopupContext from "../../context/popup.context";
import AlertPopup from "../components/AlertPopup";
import { Outlet } from "react-router";

function PopupEls() {
	const { popupData } = useContext(PopupContext);

	return popupData.map((data) => (
		<AlertPopup
			key={data.id}
			title={data.title}
			text={data.text}
			type={data.type}
			duration={data.duration}
		/>
	));
}

export default function PopupElsOutlet() {
	return (
		<>
			<Outlet />
			<PopupEls />
		</>
	);
}
