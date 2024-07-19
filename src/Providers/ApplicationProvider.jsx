import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ApplicationContext = createContext(null);

const ApplicationProvider = ({ children }) => {
	const [selectedDifficulty, setSelectedDifficulty] = useState({
		difficultyName: "Professional",
		difficultyTimers: [0, 30, 50, 60, 21, 3],
		hiddenClues: 0,
	});
	const [selectedGhost, setSelectedGhost] = useState(undefined);
	const [selectedEvidence, setSelectedEvidence] = useState([]);
	const [selectedMap, setSelectedMap] = useState(undefined);
	const [currentTimers, setCurrentTimers] = useState([]);
	const [currentObjectives, setCurrentObjectives] = useState([
		{
			id: "bone-id",
			condition:
				"You must locate the bone, it can be hidden anywhere within the current map.",
			description: "Locate the bone.",
			notes: [""],
			slug: "bone",
			strategy: "Locate the bone.",
			voice: ["bone"],
			name: "Locate the bone.",
		},
	]);
	const [difficultyModalShowing, setDifficultyModalShowing] = useState(false);
	const [mapModalShowing, setMapModalShowing] = useState(false);
	const [objectiveModalShowing, setObjectiveModalShowing] = useState(false);
	const [timerRunning, setTimerRunning] = useState(false);
	const [time, setTime] = useState(0);
	const [consoleLogs, setConsoleLogs] = useState([]);
	const [socketShowing, setSocketShowing] = useState(false);
	const [userId, setUserId] = useState("");
	const [connectedUsers, setConnectedUsers] = useState(0);
	const [evidenceLog, setEvidenceLog] = useState([]);
	const [startTime, setStartTime] = useState(undefined);
	const [endTime, setEndTime] = useState(undefined);
	const [elapsedTime, setElapsedTime] = useState("00:00:00");
	const [gameLogs, setGameLogs] = useState([]);
	const [selectedObjective, setSelectedObjective] = useState(undefined);
	const [startDecryptedSaveFile, setStartDecryptedSaveFile] = useState(undefined);
	const [endingDecryptedSaveFile, setEndingDecryptedSaveFile] = useState(undefined);
	const [showSummaryScreen, setShowSummaryScreen] = useState(false);

	useEffect(() => {
		if (startDecryptedSaveFile && endingDecryptedSaveFile) {
			setShowSummaryScreen(true);
		} else {
			setShowSummaryScreen(false);
		}
	}, [startDecryptedSaveFile, endingDecryptedSaveFile]);

	const newContract = () => {
		setStartDecryptedSaveFile(undefined);
		setEndingDecryptedSaveFile(undefined);
		setShowSummaryScreen(false);
		setSelectedDifficulty({
			difficultyName: "Professional",
			difficultyTimers: [0, 30, 50, 60, 21, 3],
			hiddenClues: 0,
		});
		setSelectedMap(undefined);
		setSelectedGhost(undefined);
		setSelectedEvidence([]);
		setCurrentTimers([]);
		setCurrentObjectives([
			{
				id: "bone-id",
				condition:
					"You must locate the bone, it can be hidden anywhere within the current map.",
				description: "Locate the bone.",
				notes: [""],
				slug: "bone",
				strategy: "Locate the bone.",
				voice: ["bone"],
				name: "Locate the bone.",
			},
		]);
		setTimerRunning(false);
		setGameLogs([]);
		setStartTime(undefined);
		setEndTime(undefined);
		setElapsedTime("00:00:00");
		setTime(0);
	};

	const updateGameLog = (event) => {
		setGameLogs((prevState) => [...prevState, event]);
	};

	const values = {
		evidenceLog,
		setEvidenceLog,
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
		consoleLogs,
		setConsoleLogs,
		socketShowing,
		setSocketShowing,
		userId,
		setUserId,
		connectedUsers,
		setConnectedUsers,
		newContract,
		startTime,
		setStartTime,
		endTime,
		setEndTime,
		elapsedTime,
		setElapsedTime,
		gameLogs,
		setGameLogs,
		updateGameLog,
		mapModalShowing,
		setMapModalShowing,
		difficultyModalShowing,
		setDifficultyModalShowing,
		objectiveModalShowing,
		setObjectiveModalShowing,
		setSelectedObjective,
		selectedObjective,
		startDecryptedSaveFile,
		setStartDecryptedSaveFile,
		endingDecryptedSaveFile,
		setEndingDecryptedSaveFile,
		showSummaryScreen,
		setShowSummaryScreen,
	};

	return (
		<ApplicationContext.Provider value={values}>{children}</ApplicationContext.Provider>
	);
};

ApplicationProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export default ApplicationProvider;
