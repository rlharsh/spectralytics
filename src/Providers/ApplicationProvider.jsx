import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ApplicationContext = createContext(null);

const ApplicationProvider = ({ children }) => {
	const [selectedDifficulty, setSelectedDifficulty] = useState(undefined);
	const [selectedGhost, setSelectedGhost] = useState(undefined);
	const [selectedEvidence, setSelectedEvidence] = useState([]);
	const [selectedMap, setSelectedMap] = useState(undefined);
	const [currentTimers, setCurrentTimers] = useState([]);
	const [currentObjectives, setCurrentObjectives] = useState([]);
	const [timerRunning, setTimerRunning] = useState(false);
	const [time, setTime] = useState(0);
	const [consoleLogs, setConsoleLogs] = useState([]);
	const [socketShowing, setSocketShowing] = useState(false);
	const [userId, setUserId] = useState("");

	const navigate = useNavigate();

	const newContract = () => {
		setSelectedDifficulty(undefined);
		setSelectedMap(undefined);
		setSelectedGhost(undefined);
		setSelectedEvidence([]);
		setCurrentTimers([]);
		setCurrentObjectives([]);
		setTimerRunning(false);
		setTime(0);
	};

	const endContract = () => {};

	const values = {
		selectedDifficulty,
		setSelectedDifficulty,
		selectedGhost,
		setSelectedGhost,
		selectedEvidence,
		setSelectedEvidence,
		selectedMap,
		setSelectedMap,
		currentTimers,
		setCurrentTimers,
		currentObjectives,
		setCurrentObjectives,
		timerRunning,
		setTimerRunning,
		time,
		setTime,
		endContract,
		consoleLogs,
		setConsoleLogs,
		socketShowing,
		setSocketShowing,
		userId,
		setUserId,
	};

	return (
		<ApplicationContext.Provider value={values}>{children}</ApplicationContext.Provider>
	);
};
export default ApplicationProvider;
