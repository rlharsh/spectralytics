import React, { useContext } from "react";
import "./css/ObjectiveManager.css";
import GameDataProvider, { GameDataContext } from "../Providers/GameDataProvider";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import ObjectiveTile from "./ObjectiveTile";
import {
	completeObjective,
	selectObjective,
	unselectObjective,
} from "../Helpers/updateObjectives";

const ObjectiveManager = () => {
	const { evidenceData, difficultyData, ghostData, mapData, objectiveData } =
		useContext(GameDataContext);
	const {
		selectedDifficulty,
		setSelectedDifficulty,
		selectedGhost,
		setSelectedGhost,
		selectedEvidence,
		setSelectedEvidence,
		selectedMap,
		setSelectedMap,
		currentTimers,
		setCurrentTimers,
		currentObjectives,
		setCurrentObjectives,
		timerRunning,
		setTimerRunning,
		time,
		setTime,
		endContract,
		consoleLogs,
		setConsoleLogs,
		socketShowing,
		setSocketShowing,
		userId,
		setUserId,
		connectedUsers,
		setConnectedUsers,
	} = useContext(ApplicationContext);

	const handleObjectiveClick = (objective) => {
		const objectiveData = currentObjectives.find((e) => e.id === objective.id) ?? null;

		if (objectiveData) {
			if (currentObjectives.length === 3) {
				setCurrentObjectives((prevObjectives) =>
					completeObjective(prevObjectives, objectiveData)
				);
			} else {
				setCurrentObjectives((prevObjectives) =>
					unselectObjective(prevObjectives, objectiveData)
				);
			}
		} else {
			if (currentObjectives.length === 3) {
			} else {
				setCurrentObjectives((prevObjectives) =>
					selectObjective(prevObjectives, objective)
				);
			}
		}
	};

	const handleResetObjectives = () => {
		setCurrentObjectives([]);
	};

	return (
		<div className="objective-wrapper">
			{currentObjectives.length !== 3 ? (
				<>
					{objectiveData.map((objective) => (
						<ObjectiveTile
							objective={objective}
							click={() => handleObjectiveClick(objective)}
							selected={() => currentObjectives.some((obj) => obj.id === objective.id)}
						/>
					))}
					<a href="#" onClick={handleResetObjectives}>
						Reset Objectives
					</a>
				</>
			) : (
				<>
					{currentObjectives.map((objective) => (
						<ObjectiveTile
							objective={objective}
							click={() => handleObjectiveClick(objective)}
							selected={objective.complete}
						/>
					))}
					<a href="#" onClick={handleResetObjectives}>
						Reset Objectives
					</a>
				</>
			)}
		</div>
	);
};

export default ObjectiveManager;
