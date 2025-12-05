import type { ListSettingsType } from "./page";

export default function TheadQuestionsList({
	setListSettings,
}: {
	setListSettings: React.Dispatch<React.SetStateAction<ListSettingsType>>;
}) {
	return (
		<thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium sticky top-0 bg-gray-100">
			<tr>
				<th scope="col" className="px-6 py-3 font-medium">
					<div className="flex items-center">
						ID
						<button
							className="cursor-pointer"
							onClick={() =>
								setListSettings((prev) => ({
									...prev,
									ascending: !prev.ascending,
								}))
							}
						>
							<svg
								className="w-4 h-4 ms-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m8 15 4 4 4-4m0-6-4-4-4 4"
								/>
							</svg>
						</button>
					</div>
				</th>
				<th scope="col" className="px-6 py-3 font-medium">
					Treść pytania
				</th>
				<th scope="col" className="px-6 py-3 font-medium">
					<div className="flex items-center">Kategoria</div>
				</th>
				<th scope="col" className="px-6 py-3 font-medium">
					<div className="flex items-center">
						Kategoria prawa jazdy
					</div>
				</th>
				<th scope="col" className="px-6 py-3 font-medium">
					<div className="flex items-center">
						Twoja znajomość pytania
						<a href="#">
							<svg
								className="w-4 h-4 ms-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m8 15 4 4 4-4m0-6-4-4-4 4"
								/>
							</svg>
						</a>
					</div>
				</th>
			</tr>
		</thead>
	);
}
