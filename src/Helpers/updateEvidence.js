export const eventLog = [];

function generateUniqueId() {
	return "_" + Math.random().toString(36).substr(2, 9);
}

export function notifyLogsChange() {
	//console.log("We adding now", new Date());
	const event = new Event("eventLogChanged");
	window.dispatchEvent(event);
}

export function toggleSelectedEvidence(evidenceData, selectedEvidences, evidence) {
	if (doesEvidenceExist(selectedEvidences, evidence)) {
		return toggleEvidenceState(selectedEvidences, evidence);
	} else {
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
		//notifyLogsChange();
	}
	return updatedEvidence;
}

export function selectEvidence(evidenceData, evidence) {
	const updatedEvidence = [...evidenceData];
	const evidenceInformation = updatedEvidence.find((e) => e.id === evidence.id);
	//const existingIndex = updatedEvidence.findIndex((e) => e.id === evidence.id);

	if (evidenceInformation) {
		//notifyLogsChange();
		return evidenceData;
	} else {
		const newEvidence = [
			...evidenceData,
			{
				...evidence,
				selectedState: 1,
			},
		];
		return newEvidence;
	}
}

export function notEvidence(evidenceData, evidence) {
	const updatedEvidence = [...evidenceData];
	const evidenceInformation = updatedEvidence.find((e) => e.id === evidence.id);
	const existingIndex = updatedEvidence.findIndex((e) => e.id === evidence.id);

	if (evidenceInformation) {
		updatedEvidence[existingIndex].selectedState = 2;
	} else {
		const newEvidence = [
			...evidenceData,
			{
				...evidence,
				selectedState: 2,
			},
		];
		return newEvidence;
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

export const capitalName = (str) => {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export const formatDateTime = (date) => {
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	};
	return new Intl.DateTimeFormat("en-US", options).format(date);
};
