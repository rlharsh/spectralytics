import { eventLog, notifyLogsChange, capitalName } from "./updateEvidence";

export function selectObjective(objectiveData, objective) {
	return [...objectiveData, { ...objective, complete: false }];
}

export function unselectObjective(objectiveData, objective) {
	return objectiveData.filter((obj) => obj.id !== objective.id);
}

export function completeObjective(objectiveData, objective, location) {
	console.log("Objective data received:", objectiveData);
	console.log("Objective to complete:", objective);

	eventLog.push({
		time: new Date(),
		location: location ? capitalName(location) : "N/A",
		evidence: "N/A",
		type: "Objective",
		description: objective.name,
	});
	//notifyLogsChange();

	return objectiveData.map((obj) => {
		if (obj.id === objective.id) {
			return { ...obj, complete: true };
		}
		return obj;
	});
}
