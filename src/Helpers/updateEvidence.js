export function toggleSelectedEvidence(evidenceData, selectedEvidences, evidence) {
	console.log(selectedEvidences);

	if (doesEvidenceExist(selectedEvidences, evidence)) {
		console.log("Found evidence in selectedEvidences.");
		return toggleEvidenceState(selectedEvidences, evidence);
	} else {
		console.log("Could not find evidence in selectedEvidences.");
		return addEvidence(selectedEvidences, evidence);
	}
}

export function addEvidence(evidenceData, evidence) {
	return [
		...evidenceData,
		{
			...evidence,
			selectedState: 1,
		},
	];
}

function toggleEvidenceState(evidenceData, evidence) {
	const updatedEvidence = [...evidenceData];
	const evidenceInformation = updatedEvidence.find((e) => e.id === evidence.id);
	const existingIndex = updatedEvidence.findIndex((e) => e.id === evidence.id);
	if (evidenceInformation.selectedState === 1) {
		updatedEvidence[existingIndex].selectedState = 2;
	} else if (evidenceInformation.selectedState === 2) {
		updatedEvidence.splice(existingIndex, 1);
	}
	return updatedEvidence;
}

export function removeEvidence(evidenceData, evidence) {
	const updatedEvidence = [...evidenceData];
	const evidenceInformation = updatedEvidence.find((e) => e.id === evidence.id);
	const existingIndex = updatedEvidence.findIndex((e) => e.id === evidence.id);

	if (evidenceInformation) {
		updatedEvidence.splice(existingIndex, 1);
	}
	return updatedEvidence;
}

export function selectEvidence(evidenceData, evidence) {
	const updatedEvidence = [...evidenceData];
	const evidenceInformation = updatedEvidence.find((e) => e.id === evidence.id);
	const existingIndex = updatedEvidence.findIndex((e) => e.id === evidence.id);

	if (evidenceInformation) {
		updatedEvidence[existingIndex].selectedState = 2;
	} else {
		return [
			...evidenceData,
			{
				...evidence,
				selectedState: 1,
			},
		];
	}

	return updatedEvidence;
}

export function notEvidence(evidenceData, evidence) {
	const updatedEvidence = [...evidenceData];
	const evidenceInformation = updatedEvidence.find((e) => e.id === evidence.id);
	const existingIndex = updatedEvidence.findIndex((e) => e.id === evidence.id);

	if (evidenceInformation) {
		updatedEvidence[existingIndex].selectedState = 2;
	} else {
		return [
			...evidenceData,
			{
				...evidence,
				selectedState: 2,
			},
		];
	}

	return updatedEvidence;
}

function doesEvidenceExist(evidenceData, evidence) {
	return evidenceData.find((e) => e.id === evidence.id) !== undefined;
}

export function clearAllEvidences(evidenceData) {
	let updatedEvidence = [...evidenceData];
	updatedEvidence = [];
	return updatedEvidence;
}
