import CollapsablePanel from "../Components/CollapsablePanel";
import GhostManager from "../Components/GhostManager";
import EvidenceManager from "../Components/EvidenceManager";
import SpectraController from "../Components/SpectraController";
import ObjectiveManager from "../Components/ObjectiveManager";
import GameLog from "../Components/GameLog";
import ContractInformation from "../Components/ContractInformation";
import MapManager from "../Components/MapManager";
import DifficultyManager from "../Components/DifficultyManager";

const Contract = () => {
	return (
		<main className="page-container">
			<MapManager title="Map Manager" />
			<DifficultyManager title="Difficulty Mangaer" />
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
					<section>
						<CollapsablePanel title="Logs">
							<GameLog />
						</CollapsablePanel>
					</section>
				</section>
				<aside className="double-panel__sidebar">
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
