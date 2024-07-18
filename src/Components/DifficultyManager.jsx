import { useContext, useState } from "react";
import CenterModal from "./CenterModal";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import { GameDataContext } from "../Providers/GameDataProvider";
import "./css/DifficultyManager.css";

const DifficultyManager = () => {
	const { setSelectedDifficulty, setDifficultyModalShowing, difficultyModalShowing } =
		useContext(ApplicationContext);
	const { difficultyData } = useContext(GameDataContext ?? []);
	const [selectedMapId, setSelectedMapId] = useState("");

	const handleMapSet = () => {
		const selectedMap = difficultyData.find(
			(difficulty) => difficulty.id === selectedMapId
		);
		//setSelectedMap(selectedMap);
		setSelectedDifficulty(selectedMap);
		setDifficultyModalShowing(false);
	};

	const handleSelectChange = (e) => {
		setSelectedMapId(e.target.value);
	};

	return (
		difficultyModalShowing && (
			<CenterModal title="Select a difficulty...">
				<div className="difficulty-manager">
					<p>Select a map from the available options below.</p>
					<select
						className="custom-select"
						name="difficulty"
						id="difficulty"
						value={selectedMapId}
						onChange={handleSelectChange}
					>
						<option value="" disabled>
							Select a difficulty
						</option>
						{difficultyData.map((map) => (
							<option key={map.id} value={map.id}>
								{map.difficultyName}
							</option>
						))}
					</select>
					<button onClick={handleMapSet} disabled={!selectedMapId}>
						Set Map
					</button>
				</div>
			</CenterModal>
		)
	);
};

export default DifficultyManager;
