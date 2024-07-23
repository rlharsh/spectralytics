import React, { useContext, useState } from "react";
import "./css/AppCore.css";
import GhostManager from "./GhostManager";
import { IoIosList } from "react-icons/io";
import SpectraController from "./SpectraController";
import EvidenceManager from "./EvidenceManager";
import { LuPanelRight } from "react-icons/lu";
import ObjectiveManager from "./ObjectiveManager";
import GameLog from "./GameLog";
import CenterModal from "./CenterModal";
import MapManager from "./MapManager";
import DifficultyManager from "./DifficultyManager";
import MapInformation from "./MapInformation";
import { CiSearch } from "react-icons/ci";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import ContractInformation from "./ContractInformation";

const AppCore = ({ sidebarToggle }) => {
	const [panelShowing, setPanelShowing] = useState(true);
	const { searchTerm, setSearchTerm, startTime, endTime } =
		useContext(ApplicationContext);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const togglePanel = () => setPanelShowing((prevState) => !prevState);

	return (
		<div className="app-core">
			<MapManager />
			<DifficultyManager />
			<div className="app-core__menu-bar">
				<div className="flex-row">
					<button className="button_small" type="button" onClick={sidebarToggle}>
						<IoIosList />
					</button>
				</div>
				<div className="app-core__button-group">
					<button>
						{startTime === undefined
							? "Start Contract"
							: endTime === undefined
							? "End Contract"
							: "New Contract"}
					</button>
					<button>Timers</button>
					<SpectraController />
				</div>
			</div>
			<div className="app-core__options">
				<div className="flex-row">
					<ContractInformation />
					<div>
						<div className="input-search">
							<CiSearch />
							<input
								type="text"
								name=""
								id=""
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</div>
						<button className="button_small" onClick={togglePanel}>
							<LuPanelRight />
						</button>
					</div>
				</div>
			</div>
			<div className="app-core__content-wrapper">
				<div className="app-core__content">
					<GhostManager />
				</div>
				{panelShowing && (
					<aside className="app-core__sidebar">
						<EvidenceManager />
						<MapInformation />
					</aside>
				)}
			</div>
		</div>
	);
};

export default AppCore;
