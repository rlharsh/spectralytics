import { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./css/SpectraController.css";
import { AiOutlineRobot } from "react-icons/ai";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import { GameDataContext } from "../Providers/GameDataProvider";
import { notEvidence, removeEvidence, selectEvidence } from "../Helpers/updateEvidence";
import { v4 as uuidv4 } from "uuid";
import { completeObjective, selectObjective } from "../Helpers/updateObjectives";
import socket from "../Helpers/socket";
import { useAuth } from "../Providers/AuthProvider";

const SpectraController = () => {
	const { user } = useAuth();

	const [isSupported, setIsSupported] = useState(true);
	const [transcript, setTranscript] = useState(null);
	const [listening, setListening] = useState(false);

	const recognitionRef = useRef(null);
	const silenceTimeoutRef = useRef(null);
	const audioRef = useRef(null);

	const {
		setSelectedEvidence,
		selectedGhost,
		currentObjectives,
		setCurrentObjectives,
		newContract,
		startTime,
		setStartTime,
		setEndTime,
		elapsedTime,
		setElapsedTime,
		updateGameLog,
		gameLogs,
	} = useContext(ApplicationContext);
	const { evidenceData, loading, objectiveData, writeGameLog } =
		useContext(GameDataContext);

	const contractTimer = useRef(null);

	const toggleListening = () => {
		setListening((previousListening) => !previousListening);
		if (!listening) {
			if (recognitionRef.current) recognitionRef.current.start();
		} else {
			if (recognitionRef.current) recognitionRef.current.stop();
		}
	};

	const addEvidence = useCallback(
		(e, l) => {
			if (!contractTimer.current) return;

			console.log("Adding evidence:", e);
			const locatedEvidence = evidenceData.find((ev) => ev.evidenceSlug === e);

			if (locatedEvidence) {
				console.log(`${e} is a confirmed match.`);
				setSelectedEvidence((prevEvidence) =>
					selectEvidence(prevEvidence, locatedEvidence, {
						time: new Date(),
						location: l,
						evidence: locatedEvidence.name,
						type: "Evidence",
						description: `Updated evidence ${locatedEvidence.name}`,
					})
				);
				updateGameLog({
					time: new Date(),
					location: l,
					evidence: locatedEvidence.name,
					type: "Evidence",
					description: `Updated evidence ${locatedEvidence.name}`,
				});
			} else {
				console.log(`Unable to find a match for ${e}.`);
			}
		},
		[evidenceData, contractTimer, setSelectedEvidence, updateGameLog]
	);

	const unselectEvidence = useCallback(
		(e) => {
			if (!contractTimer.current) return;

			const locatedEvidence = evidenceData.find((ev) => ev.evidenceSlug === e);

			if (locatedEvidence) {
				setSelectedEvidence((prevEvidence) =>
					removeEvidence(prevEvidence, locatedEvidence)
				);
			}
		},
		[evidenceData, contractTimer, setSelectedEvidence]
	);

	const notThisEvidence = useCallback(
		(e) => {
			if (!contractTimer.current) return;

			const locatedEvidence = evidenceData.find((ev) => ev.evidenceSlug === e);

			if (locatedEvidence) {
				setSelectedEvidence((prevEvidence) =>
					notEvidence(prevEvidence, locatedEvidence, {
						time: new Date(),
						location: "N/A",
						evidence: locatedEvidence.name,
					})
				);
				updateGameLog({
					time: new Date(),
					location: "N/A",
					evidence: locatedEvidence.name,
					type: "Evidence Dismissed",
					description: `User has ruled out ${locatedEvidence.name} as evidence.`,
				});
			} else {
				console.log(`Could not find evidence: ${e}`);
			}
		},
		[evidenceData, contractTimer, setSelectedEvidence, updateGameLog]
	);

	const addObjective = useCallback(
		(e) => {
			const locatedObjective = objectiveData.find((ob) => ob.slug === e);

			if (locatedObjective) {
				setCurrentObjectives((prevObjectives) =>
					selectObjective(prevObjectives, locatedObjective)
				);
				updateGameLog({
					time: new Date(),
					location: "N/A",
					evidence: "N/A",
					type: "Objective Added",
					description: locatedObjective.name,
				});
			}
		},
		[objectiveData, setCurrentObjectives, updateGameLog]
	);

	const completeAnObjective = useCallback(
		(e, l) => {
			if (!contractTimer.current) return;

			console.log("Event received:", e);
			console.log("Current objectives before update:", currentObjectives);

			const locatedObjective = currentObjectives.find((ob) => ob.slug === e) ?? null;

			if (locatedObjective) {
				setCurrentObjectives((prevObjectives) =>
					completeObjective(prevObjectives, locatedObjective, l)
				);
				updateGameLog({
					time: new Date(),
					location: l ? l : "N/A",
					evidence: "N/A",
					type: "Objective",
					description: locatedObjective.name,
				});
			} else {
				console.warn("Objective not found for slug:", e);
			}
		},
		[contractTimer, setCurrentObjectives, currentObjectives, updateGameLog]
	);

	const endContract = useCallback(async () => {
		if (!contractTimer.current) return;

		if (contractTimer.current) {
			clearInterval(contractTimer.current);
			contractTimer.current = null;
		}
		updateGameLog({
			time: new Date(),
			location: "N/A",
			evidence: "N/A",
			type: "Objective",
			description: "User has ended the contract.",
		});
		setStartTime(null);

		const uid = uuidv4();
		console.log(user);
		setEndTime(new Date());

		const contractData = {
			id: uid,
			owner: uid,
			startTime: startTime,
			endTime: new Date(),
			elapsedTime: elapsedTime,
			selectedGhost: selectedGhost ?? "Unknown",
			duration: elapsedTime,
			evidenceLogs: gameLogs.filter((event) => event.type === "Evidence"),
			objectiveLogs: gameLogs.filter((event) => event.type === "Objective"),
		};

		await writeGameLog(contractData);
		console.log("Finished");
	}, [
		contractTimer,
		elapsedTime,
		setEndTime,
		setStartTime,
		startTime,
		user,
		writeGameLog,
		selectedGhost,
		gameLogs,
		updateGameLog,
	]);

	const beginContract = useCallback(async () => {
		setStartTime(new Date());
		updateGameLog({
			time: new Date(),
			location: "N/A",
			evidence: "N/A",
			type: "Contract Start",
			description: "User has begun the contract.",
		});
	}, [setStartTime, updateGameLog]);

	useEffect(() => {
		if (startTime) {
			contractTimer.current = setInterval(() => {
				const now = new Date();
				const diff = now - startTime;
				const hours = Math.floor(diff / 3600000)
					.toString()
					.padStart(2, "0");
				const minutes = Math.floor((diff % 3600000) / 60000)
					.toString()
					.padStart(2, "0");
				const seconds = Math.floor((diff % 60000) / 1000)
					.toString()
					.padStart(2, "0");
				setElapsedTime(`${hours}:${minutes}:${seconds}`);
			}, 1000);
		}
		return () => {
			clearInterval(contractTimer.current);
			contractTimer.current = null;
		};
	}, [startTime, setElapsedTime]);

	useEffect(() => {
		const handleNlpResponse = (responseData) => {
			const json = JSON.parse(responseData);
			const intent = json.intent;
			const evidence = json.evidence;
			const location = json.location;
			const objective = json.objectives;
			playAudio();

			switch (intent) {
				case "select_evidence":
					evidence.forEach((e) => addEvidence(e, location));
					break;
				case "unselect_evidence":
					evidence.forEach((e) => unselectEvidence(e));
					break;
				case "not_evidence":
					evidence.forEach((e) => notThisEvidence(e));
					break;
				case "add_objective":
					objective.forEach((e) => addObjective(e));
					break;
				case "complete_objective":
					objective.forEach((e) => completeAnObjective(e, location));
					break;
				case "new_contract":
					newContract();
					break;
				case "end_contract":
					endContract();
					break;
				case "begin_contract":
					beginContract();
					break;
				default:
					console.log("Unhandled intent:", intent);
			}
		};

		socket.on("nlp", handleNlpResponse);

		return () => {
			socket.off("nlp", handleNlpResponse);
		};
	}, [
		evidenceData,
		addObjective,
		addEvidence,
		beginContract,
		completeAnObjective,
		endContract,
		newContract,
		notThisEvidence,
		unselectEvidence,
	]);

	useEffect(() => {}, [selectedGhost]);

	const playAudio = () => {
		if (audioRef.current) {
			audioRef.current.src = "/audio/coin.mp3";
			audioRef.current.play();
		}
	};

	const processTranscript = useCallback(async (t) => {
		if (t.toLowerCase().includes("spectra")) {
			socket.emit("nlp", t.toLowerCase());
		}
	}, []);

	const handleResult = useCallback(
		(event) => {
			let newTranscript = "";
			for (let i = event.resultIndex; i < event.results.length; i++) {
				newTranscript += event.results[i][0].transcript;
			}

			if (event.results[event.resultIndex].isFinal) {
				if (silenceTimeoutRef.current) {
					clearTimeout(silenceTimeoutRef.current);
				}

				if (newTranscript !== transcript) {
					processTranscript(newTranscript.toLowerCase());
					setTranscript(newTranscript);
				}
			}
		},
		[transcript, processTranscript]
	);

	useEffect(() => {
		if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
			setIsSupported(false);
			return;
		}

		recognitionRef.current = new (window.SpeechRecognition ||
			window.webkitSpeechRecognition)();
		recognitionRef.current.continuous = true;
		recognitionRef.current.interimResult = true;
		recognitionRef.current.onresult = handleResult;

		recognitionRef.current.onend = () => {
			recognitionRef.current.start();
		};

		recognitionRef.current.onerror = (event) => {
			if (event.error === "no-speech" || event.error === "audio-capture") {
				// PASS
			} else if (event.error === "not-allowed") {
				setIsSupported(false);
			}
		};

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
				recognitionRef.current.onresult = null;
				recognitionRef.current.onend = null;
				recognitionRef.current.onerror = null;
			}
		};
	}, []);

	useEffect(() => {}, [loading, evidenceData]);

	return !loading && isSupported ? (
		<div className="spectra" onClick={toggleListening}>
			<AiOutlineRobot />
			<audio ref={audioRef} />
		</div>
	) : (
		<div>Loading...</div>
	);
};

export default SpectraController;
