import { useContext } from "react";
import "./css/EvidenceManager.css";
import { GameDataContext } from "../Providers/GameDataProvider";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import EvidenceTile from "./EvidenceTile";
import "./css/EvidenceManager.css";
import { toggleSelectedEvidence } from "../Helpers/updateEvidence";

const EvidenceManager = () => {
	const { evidenceData } = useContext(GameDataContext);

	const { selectedEvidence, setSelectedEvidence } = useContext(ApplicationContext);

	const updateSelectedEvidences = (newEvidence) => {
		setSelectedEvidence(
			toggleSelectedEvidence(evidenceData, selectedEvidence, newEvidence)
		);
	};

	const clearAllEvidence = () => {
		setSelectedEvidence([]);
	};

	let count = 0;

	return (
		<div className="evidence-container">
			<h2>Available Evidence</h2>
			{evidenceData.length > 0 &&
				evidenceData.map((item) => {
					count++;
					const existingEvidence = selectedEvidence.find((e) => e.id === item.id);
					const selectedState = existingEvidence ? existingEvidence.selectedState : 0;

					return (
						<EvidenceTile
							count={count}
							key={item.id}
							evidence={item}
							selected={selectedState}
							onClick={() => updateSelectedEvidences(item)}
						/>
					);
				})}
			<a href="#" onClick={() => clearAllEvidence()}>
				Clear All Evidence
			</a>
		</div>
	);
};

export default EvidenceManager;
