import { useContext } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import "./css/ContractInformation.css";

const ContractInformation = () => {
	const {
		elapsedTime,
		selectedMap,
		selectedDifficulty,
		setMapModalShowing,
		setDifficultyModalShowing,
	} = useContext(ApplicationContext);

	const handleMapClick = () => {
		setMapModalShowing((prevState) => !prevState);
	};

	const handleDifficultyClick = () => {
		setDifficultyModalShowing((prevState) => !prevState);
	};

	return (
		<div className="contract-information">
			<div className="flex-row">
				<h2>Current Map:</h2>
				<a href="#" className="accent-text" onClick={() => handleMapClick()}>
					{selectedMap?.mapName ?? "Unselected"}
				</a>
			</div>
			<div className="flex-row">
				<h2>Current Difficulty:</h2>
				<a href="#" className="accent-text" onClick={() => handleDifficultyClick()}>
					{selectedDifficulty?.difficultyName ?? "Unselected"}
				</a>
			</div>
			<div className="flex-row">
				<h2>Elapsed Time:</h2>
				<p className="accent-text">{elapsedTime}</p>
			</div>
		</div>
	);
};

export default ContractInformation;
