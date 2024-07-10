import React, { useContext, useEffect } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { GameDataContext } from "../Providers/GameDataProvider";

const Contract = () => {
	const { evidenceData, difficultyData, ghostData, mapData, objectiveData } =
		useContext(GameDataContext);

	console.log(ghostData);
	return (
		<main className="page-container">
			<div className="double-panel">
				<section className="double-panel__main"></section>
				<aside className="double-panel__sidebar"></aside>
			</div>
		</main>
	);
};

export default Contract;
