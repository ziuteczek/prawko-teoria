import logo from "../assets/logo.png";
import HomeIcon from "../assets/home-icon.svg";
import testIcon from "../assets/test-icon.svg";
import settingsIcon from "../assets/settings-icon.svg";
import learningIcon from "../assets/learning-icon.svg";
import logOutIcon from "../assets/log-out-icon.svg";
import { useState } from "react";

function NavLink({
	text,
	img,
	link,
	textClass,
}: {
	img: string;
	text: string;
	link: string;
	textClass?: string;
}) {
	return (
		<li className="">
			<a href={link} className="flex justify-between items-center">
				<div className="size-6 mr-5 ml-1 flex-none">
					<img src={img} alt="" className="" />
				</div>
				<span
					className={`text-nowrap flex items-center text-md uppercase ${textClass} w-full text-center`}
				>
					{text}
				</span>
			</a>
		</li>
	);
}

export default function NavBar() {
	const [isExtended, setIsExtended] = useState(false);

	return (
		<nav
			className={`fixed overflow-clip pr-10 bg-neutral-100 rounded-br-2xl rounded-tr-2xl h-[90svh] top-[5svh] flex flex-col border border-neutral-400 ${
				isExtended ? "w-fit" : "w-15"
			}`}
			onMouseOver={()=>setIsExtended(true)}
			onMouseOut={()=>setIsExtended(false)}
		>
			<div className="ml-3.5 mr-3.5 h-full">
				{/* Top icons  */}
				<div className="mt-4">
					<ul>
						<NavLink
							text="prawko-teoria.pl"
							img={logo}
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
							img={HomeIcon}
							link="#"
						/>
						<NavLink text={"Nauka"} img={learningIcon} link="#" />
						<NavLink text={"Testy"} img={testIcon} link="#" />
						<NavLink
							text={"Ustawienia"}
							img={settingsIcon}
							link="#"
						/>
					</div>	

					<div className="mb-40">
						<NavLink text="" img={logOutIcon} link="#"/>
					</div>
				</ul>
			</div>
		</nav>
	);
}
