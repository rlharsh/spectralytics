export function selectObjective(objectiveData, objective) {
	console.log(objective);
	return [...objectiveData, { ...objective, complete: false }];
}

export function unselectObjective(objectiveData, objective) {
	return objectiveData.filter((obj) => obj.id !== objective.id);
}

export function completeObjective(objectiveData, objective) {
	return objectiveData.map((obj) => {
		if (obj.id === objective.id) {
			return { ...obj, complete: true };
		} else {
			return obj;
		}
	});
}
