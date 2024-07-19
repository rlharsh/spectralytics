import React, { useEffect } from "react";
import "./css/SummaryScreen.css";

const SummaryScreen = ({ startJson, endJson }) => {
	const calculateDifference = (start, end) => {
		return end - start;
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	const ghostType = endJson.GhostType.value;
	const moneyEarned = calculateDifference(
		startJson.moneyEarned.value,
		endJson.moneyEarned.value
	);
	const experienceGained = calculateDifference(
		startJson.Experience.value,
		endJson.Experience.value
	);
	const objectivesCompleted = calculateDifference(
		startJson.objectivesCompleted.value,
		endJson.objectivesCompleted.value
	);
	const ghostEvents = calculateDifference(
		startJson.amountOfGhostEvents.value,
		endJson.amountOfGhostEvents.value
	);
	const ghostHunts = calculateDifference(
		startJson.amountOfGhostHunts.value,
		endJson.amountOfGhostHunts.value
	);
	const timeInGhostRoom = calculateDifference(
		startJson.timeSpentInGhostsRoom.value,
		endJson.timeSpentInGhostsRoom.value
	);
	const photosTaken = calculateDifference(
		startJson.photosTaken.value,
		endJson.photosTaken.value
	);
	const itemsLost = calculateDifference(
		startJson.itemsLost.value,
		endJson.itemsLost.value
	);
	const sanityLost = calculateDifference(
		startJson.sanityLost.value,
		endJson.sanityLost.value
	);
	const deaths = calculateDifference(
		startJson.diedAmount.value,
		endJson.diedAmount.value
	);
	const cursedPossessionsUsed = calculateDifference(
		startJson.amountOfCursedPossessionsUsed.value,
		endJson.amountOfCursedPossessionsUsed.value
	);

	const renderDifference = (value, reverse = false) => {
		if (value > 0) {
			return <span>▲ {reverse ? `-${value}` : `+${value}`}</span>;
		} else if (value < 0) {
			return <span>▼ {reverse ? `+${Math.abs(value)}` : value}</span>;
		}
		return <span>● 0</span>;
	};

	return (
		<div>
			<h2>Game Over Summary</h2>

			<h3>Ghost Information</h3>
			<p>Ghost Type: {ghostType}</p>

			<h3>Mission Success</h3>
			<p>Money Earned: {renderDifference(moneyEarned)}</p>
			<p>Experience Gained: {renderDifference(experienceGained)}</p>
			<p>Objectives Completed: {renderDifference(objectivesCompleted)}</p>

			<h3>Ghost Interactions</h3>
			<p>Ghost Events: {renderDifference(ghostEvents)}</p>
			<p>Ghost Hunts: {renderDifference(ghostHunts)}</p>
			<p>Time in Ghost Room: {formatTime(timeInGhostRoom)}</p>

			<h3>Equipment Usage</h3>
			<p>Photos Taken: {renderDifference(photosTaken)}</p>
			<p>Items Lost: {renderDifference(itemsLost)}</p>

			<h3>Player Stats</h3>
			<p>Sanity Lost: {renderDifference(sanityLost, true)}</p>
			<p>Deaths: {renderDifference(deaths)}</p>

			<h3>Special Interactions</h3>
			<p>Cursed Possessions Used: {renderDifference(cursedPossessionsUsed)}</p>
		</div>
	);
};

export default SummaryScreen;
