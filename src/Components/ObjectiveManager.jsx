import { useContext } from "react";
import "./css/ObjectiveManager.css";
import { GameDataContext } from "../Providers/GameDataProvider";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import ObjectiveTile from "./ObjectiveTile";
import {
	completeObjective,
	selectObjective,
	unselectObjective,
} from "../Helpers/updateObjectives";

const ObjectiveManager = () => {
	const { objectiveData } = useContext(GameDataContext);
	const { currentObjectives, setCurrentObjectives } = useContext(ApplicationContext);

	const handleObjectiveClick = (objective) => {
		const objectiveData = currentObjectives.find((e) => e.id === objective.id) ?? null;

		if (objectiveData) {
			if (currentObjectives.length === 4) {
				setCurrentObjectives((prevObjectives) =>
					completeObjective(prevObjectives, objectiveData)
				);
			} else {
				setCurrentObjectives((prevObjectives) =>
					unselectObjective(prevObjectives, objectiveData)
				);
			}
		} else {
			if (currentObjectives.length !== 4) {
				setCurrentObjectives((prevObjectives) =>
					selectObjective(prevObjectives, objective)
				);
			}
		}
	};

	const handleResetObjectives = () => {
		setCurrentObjectives([
			{
				id: "bone-id",
				condition:
					"You must locate the bone, it can be hidden anywhere within the current map.",
				description: "Locate the bone.",
				notes: [""],
				slug: "bone",
				strategy: "Locate the bone.",
				voice: ["bone"],
				name: "Locate the bone.",
			},
		]);
	};

	return (
		<div className="objective-wrapper">
			{currentObjectives.length !== 4 ? (
				<>
					{objectiveData.map((objective) => (
						<ObjectiveTile
							key={objective.id}
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
							key={objective.id}
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
