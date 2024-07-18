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
				<h3>Current Map:</h3>
				<a href="#" className="accent-text" onClick={() => handleMapClick()}>
					{selectedMap?.mapName ?? "Unselected"}
				</a>
			</div>
			<div className="flex-row">
				<h3>Current Difficulty:</h3>
				<a href="#" className="accent-text" onClick={() => handleDifficultyClick()}>
					{selectedDifficulty?.difficultyName ?? "Unselected"}
				</a>
			</div>
			<div className="flex-row">
				<h3>Elapsed Time:</h3>
				<p className="accent-text">{elapsedTime}</p>
			</div>
			<button>
				{startTime === undefined
					? "Start Contract"
					: endTime === undefined
					? "End Contract"
					: "New Contract"}
			</button>
		</div>
	);
};

export default ContractInformation;
