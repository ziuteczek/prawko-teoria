/// <reference types="vite-plugin-svgr/client" />
import logo from "../assets/logo.png";
import HomeIcon from "../assets/home-icon.svg?react";
import TestIcon from "../assets/test-icon.svg?react";
import SettingsIcon from "../assets/settings-icon.svg?react";
import LearningIcon from "../assets/learning-icon.svg?react";
import LogOutIcon from "../assets/log-out-icon.svg?react";
import { Link } from "react-router";

function NavLink({
	text,
	Img,
	link,
	textClass,
}: {
	Img:
		| React.FunctionComponent<
				React.SVGProps<SVGSVGElement> & {
					title?: string;
					titleId?: string;
					desc?: string;
					descId?: string;
				}
		  >
		| string;
	text: string;
	link: string;
	textClass?: string;
}) {
	return (
		<li className="">
			<Link to={link} className="flex justify-between items-center">
				<div className="size-6 mr-5 ml-1 flex-none">
					{typeof Img === "string" ? (
						<img src={Img} alt="" />
					) : (
						<Img className="max-w-full max-h-full " />
					)}
				</div>
				<span
					className={`text-nowrap flex items-center text-md uppercase ${textClass} w-full text-center`}
				>
					{text}
				</span>
			</Link>
		</li>
	);
}

export default function NavBar() {
	return (
		<nav
			className={
				"fixed z-10 overflow-clip pr-10 bg-neutral-100 rounded-br-2xl rounded-tr-2xl h-[90svh] top-[5svh] flex flex-col border border-neutral-400 max-w-15 hover:max-w-200 transition-all duration-300"
			}
		>
			<div className="ml-3.5 mr-3.5 h-full">
				{/* Top icons  */}
				<div className="mt-4">
					<ul>
						<NavLink
							text="prawko-teoria.pl"
							Img={logo}
							link="#"
							textClass="font-bold"
						/>
					</ul>
				</div>

				{/*main Icons */}
				<ul className="mt-17 flex flex-col justify-between h-full">
					<div className="flex flex-col gap-9">
						<NavLink
							text={"Strona główna"}
							Img={HomeIcon}
							link="#"
						/>
						<NavLink text={"Lista pytań"} Img={LearningIcon} link="#" />
						<NavLink text={"Nauka i testy"} Img={TestIcon} link="#" />
						<NavLink
							text={"Ustawienia"}
							Img={SettingsIcon}
							link="#"
						/>
					</div>

					<div className="mb-40">
						<NavLink
							text="wyloguj"
							Img={LogOutIcon}
							link="/logout"
						/>
					</div>
				</ul>
			</div>
		</nav>
	);
}
