import { useContext } from "react";
import socket from "./socket";

const getIntent = (text, evidenceData, objectiveData, currentObjectives) => {
	const words = text.toLowerCase().split(" ");
	const entities = [];

	let intent = {
		intent: "",
		evidence: [],
		location: "",
		response: "",
		objective: {},
	};

	if (words.includes("new") && words.includes("contract")) {
		intent.intent = "new_contract";
		intent.response =
			"Great, I've reset all of your data, and prepared a new contract sheet for you.";
	}

	if (
		(words.includes("door") && words.includes("opening")) ||
		(words.includes("door") && words.includes("open")) ||
		(words.includes("start") && words.includes("contract")) ||
		(words.includes("door") && words.includes("opened"))
	) {
		intent.intent = "start_contract";
		intent.response =
			"Okay, good luck on your contract, try not to get yourself killed.";
	}

	if (
		words.includes("select") ||
		words.includes("found") ||
		words.includes("located") ||
		words.includes("saw") ||
		words.includes("heard")
	) {
		intent.intent = "select_evidence";

		const matchedEvidence = evidenceData.find((evidence) =>
			evidence.voice.some((word) => text.includes(word.toLowerCase()))
		);

		if (matchedEvidence) {
			intent.evidence.push(matchedEvidence);
			intent.response = `Okay, I have selected ${matchedEvidence.name} for you.`;
		}
	}

	if (words.includes("unselect")) {
		intent.intent = "unselect_evidence";

		const matchedEvidence = evidenceData.find((evidence) =>
			evidence.voice.some((word) => text.includes(word.toLowerCase()))
		);

		if (matchedEvidence) {
			intent.evidence.push(matchedEvidence);
			intent.response = `Okay, I have unselected ${matchedEvidence.name} for you.`;
		}
	}

	if (words.includes("not")) {
		intent.intent = "not_evidence";

		const matchedEvidence = evidenceData.find((evidence) =>
			evidence.voice.some((word) => text.includes(word.toLowerCase()))
		);

		if (matchedEvidence) {
			intent.evidence.push(matchedEvidence);
			intent.response = `Okay, I have ruled out ${matchedEvidence.name} for you.`;
		}
	}

	if (words.includes("door") && words.includes("open")) {
		intent.intent = "start_contract";
	}

	if (words.includes("objective") && words.includes("completed")) {
		console.log(currentObjectives);

		const matchedObjective = objectiveData.find((objective) =>
			objective.voice.some((word) => text.includes(word.toLowerCase()))
		);

		if (matchedObjective) {
			intent.intent = "complete_objective";
			intent.objective = matchedObjective;
			intent.response = `${matchedObjective.name} completed.`;
		} else {
			intent.intent = "complete_objective";
		}
	} else if (words.includes("objective")) {
		const matchedObjective = objectiveData.find((objective) =>
			objective.voice.some((word) => text.includes(word.toLowerCase()))
		);

		if (matchedObjective) {
			intent.intent = "add_objective";
			intent.objective = matchedObjective;
		} else {
			console.log("No matches.");
		}
	}

	if (words.includes("reset") || words.includes("clear")) {
		intent.intent = "reset_objective";
	}

	return intent;
};

export { getIntent };
