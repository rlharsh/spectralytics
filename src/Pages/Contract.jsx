import React, { useContext, useEffect } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { GameDataContext } from "../Providers/GameDataProvider";
import CollapsablePanel from "../Components/CollapsablePanel";
import GhostManager from "../Components/GhostManager";
import EvidenceManager from "../Components/EvidenceManager";
import SpectraController from "../Components/SpectraController";
import ObjectiveManager from "../Components/ObjectiveManager";

const Contract = () => {
	const { evidenceData, difficultyData, ghostData, mapData, objectiveData } =
		useContext(GameDataContext);

	return (
		<main className="page-container">
			<SpectraController />
			<div className="double-panel">
				<section className="double-panel__main">
					<div className="flex-container">
						<CollapsablePanel title="Objectives">
							<ObjectiveManager />
						</CollapsablePanel>
						<CollapsablePanel title="Stats">Not Yet Implemented</CollapsablePanel>
					</div>
					<section>
						<CollapsablePanel title="Ghost Data">
							<GhostManager />
						</CollapsablePanel>
					</section>
				</section>
				<aside className="double-panel__sidebar">
					<CollapsablePanel title="Contract">Not Yet Implemented</CollapsablePanel>
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
