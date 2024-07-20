import CollapsablePanel from "../Components/CollapsablePanel";
import GhostManager from "../Components/GhostManager";
import EvidenceManager from "../Components/EvidenceManager";
import SpectraController from "../Components/SpectraController";
import ObjectiveManager from "../Components/ObjectiveManager";
import GameLog from "../Components/GameLog";
import ContractInformation from "../Components/ContractInformation";
import MapManager from "../Components/MapManager";
import DifficultyManager from "../Components/DifficultyManager";
import MapInformation from "../Components/MapInformation";
import { useContext, useEffect } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";

const Contract = () => {
	const { startDecryptedSaveFile, endingDecryptedSaveFile } =
		useContext(ApplicationContext);

	useEffect(() => {
		//console.log(startDecryptedSaveFile);
	}, [startDecryptedSaveFile]);

	useEffect(() => {
		//console.log(endingDecryptedSaveFile);
	}, [endingDecryptedSaveFile]);

	return (
		<main className="page-container">
			<MapManager title="Map Manager" />
			<DifficultyManager title="Difficulty Manager" />
			<SpectraController />
			<div className="triple-panel">
				<aside className="triple-panel__left-sidebar">
					<CollapsablePanel title="Map Information">
						<MapInformation />
					</CollapsablePanel>
					<CollapsablePanel title="Objectives">
						<ObjectiveManager />
					</CollapsablePanel>
				</aside>
				<section className="triple-panel__main">
					<CollapsablePanel title="Ghost Data">
						<GhostManager />
					</CollapsablePanel>
					<CollapsablePanel title="Logs">
						<GameLog />
					</CollapsablePanel>
				</section>
				<aside className="triple-panel__right-sidebar">
					<CollapsablePanel title="Contract">
						<ContractInformation />
					</CollapsablePanel>
					<CollapsablePanel title="Evidence">
						<EvidenceManager />
					</CollapsablePanel>
					<CollapsablePanel title="Timers">Not Yet Implemented</CollapsablePanel>
				</aside>
			</div>
		</main>
	);
};

export default Contract;
