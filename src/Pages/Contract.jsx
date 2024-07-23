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
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import Sidebar from "../Components/Sidebar";
import AppCore from "../Components/AppCore";

const Contract = () => {
	const [sidebarVisible, setSidebarVisible] = useState(true);

	const { startDecryptedSaveFile, endingDecryptedSaveFile } =
		useContext(ApplicationContext);

	useEffect(() => {}, [startDecryptedSaveFile]);

	useEffect(() => {}, [endingDecryptedSaveFile]);

	const toggleSidebar = () => {
		setSidebarVisible((prevState) => !prevState);
	};

	return (
		<main className="page-container">
			<div className="app-cage">
				{sidebarVisible && (
					<aside>
						<Sidebar visible={sidebarVisible} />
					</aside>
				)}
				<div className="app-cage__content">
					<AppCore sidebarToggle={toggleSidebar} />
				</div>
			</div>
		</main>
	);
};

export default Contract;
