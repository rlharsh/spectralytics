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
		endTime,
		startTime,
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
				<h3>Map:</h3>
				<a href="#" className="accent-text" onClick={() => handleMapClick()}>
					{selectedMap?.mapName ?? "Unselected"}
				</a>
			</div>
			<div className="flex-row">
				<h3>Difficulty:</h3>
				<a href="#" className="accent-text" onClick={() => handleDifficultyClick()}>
					{selectedDifficulty?.difficultyName ?? "Unselected"}
				</a>
			</div>
			<div className="flex-row">
				<h3>Time:</h3>
				<p className="accent-text">{elapsedTime}</p>
			</div>
		</div>
	);
};

export default ContractInformation;
