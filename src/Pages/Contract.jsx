import React, { useContext, useEffect } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { GameDataContext } from "../Providers/GameDataProvider";

const Contract = () => {
	const { evidenceData, difficultyData, ghostData, mapData, objectiveData } =
		useContext(GameDataContext);

	return (
		<main className="page-container">
			<div className="double-panel">
				<section className="double-panel__main">Left</section>
				<aside className="double-panel__sidebar">Right</aside>
			</div>
		</main>
	);
};

export default Contract;
