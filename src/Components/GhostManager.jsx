import { useCallback, useContext, useEffect, useState } from "react";
import { GameDataContext } from "../Providers/GameDataProvider";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import GhostTile from "./GhostTile";
import "./css/GhostManager.css";
import { useLocation } from "react-router-dom";

const GhostManager = () => {
	const { ghostData } = useContext(GameDataContext);
	const { setSelectedGhost, selectedEvidence } = useContext(ApplicationContext);

	const [ghostTiles, setGhostTiles] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const location = useLocation();

	const filterGhostsByEvidence = useCallback(() => {
		return ghostData.filter((ghost) => {
			const ghostCluesLower = ghost.clues.map((clue) => clue.toLowerCase());

			const allConfirmedMatch = selectedEvidence
				.filter((evidence) => evidence.selectedState === 1)
				.every((evidence) =>
					ghostCluesLower.includes(evidence.evidenceSlug.toLowerCase())
				);

			const anyRuledOutMatch = selectedEvidence
				.filter((evidence) => evidence.selectedState === 2)
				.some((evidence) =>
					ghostCluesLower.includes(evidence.evidenceSlug.toLowerCase())
				);

			return allConfirmedMatch && !anyRuledOutMatch;
		});
	}, [ghostData, selectedEvidence]);

	const filterGhosts = useCallback(() => {
		let filteredGhosts = filterGhostsByEvidence();

		if (searchTerm) {
			const ghost = ghostData.filter((ghost) =>
				ghost.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			return ghost;
		}

		return filteredGhosts;
	}, [ghostData, searchTerm, filterGhostsByEvidence]);

	useEffect(() => {
		if (ghostData.length > 0) {
			setGhostTiles(ghostData);
		}
	}, [location.pathname, ghostData]);

	useEffect(() => {
		const filteredGhosts = filterGhosts();
		setGhostTiles(filteredGhosts);

		if (filteredGhosts.length === 1) {
			setSelectedGhost(filteredGhosts[0]);
		} else {
			setSelectedGhost(undefined);
		}
	}, [selectedEvidence, searchTerm, filterGhosts, setSelectedGhost, setGhostTiles]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className="ghost-manager-wrapper">
			<div className="search-box">
				Search:
				<input
					type="text"
					placeholder="Enter a ghost name to lookup information (e.g., Poltergeist)"
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</div>
			<div className="ghost-container">
				{ghostData &&
					ghostTiles.map((ghost) => <GhostTile key={ghost.name} ghost={ghost} />)}
			</div>
		</div>
	);
};

export default GhostManager;
