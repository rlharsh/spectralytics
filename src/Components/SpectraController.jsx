import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./css/SpectraController.css";
import { AiOutlineRobot } from "react-icons/ai";
import { getAudioFromText } from "../Helpers/textToSpeech";
import { getIntent } from "../Helpers/nlpProcessor";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import GameDataProvider, { GameDataContext } from "../Providers/GameDataProvider";
import {
	notEvidence,
	removeEvidence,
	selectEvidence,
	toggleSelectedEvidence,
} from "../Helpers/updateEvidence";
import { completeObjective, selectObjective } from "../Helpers/updateObjectives";

const SpectraController = () => {
	const [isSupported, setIsSupported] = useState(true);
	const [transcript, setTranscript] = useState(null);
	const [listening, setListening] = useState(false);
	const [voiceUrl, setVoiceUrl] = useState(null);

	const [awaitingReturn, setAwaitingReturn] = useState(false);
	const recognitionRef = useRef(null);
	const wakeWordHeardRef = useRef(false);
	const silenceTimeoutRef = useRef(null);
	const audioRef = useRef(null);

	const {
		selectedEvidence,
		setSelectedEvidence,
		selectedGhost,
		currentObjectives,
		setCurrentObjectives,
	} = useContext(ApplicationContext);
	const { evidenceData, loading, objectiveData } = useContext(GameDataContext);

	const toggleListening = () => {
		setListening((previousListening) => !previousListening);
		if (!listening) {
			console.log("Starting speech logging.");
			if (recognitionRef.current) recognitionRef.current.start();
		} else {
			console.log("Stopping speech logging.");
			if (recognitionRef.current) recognitionRef.current.stop();
		}
	};

	useEffect(() => {
		console.log("selectedEvidence updated.");
	}, [selectedEvidence]);

	useEffect(() => {
		const updateURL = async () => {
			if (selectedGhost !== undefined) {
				const url = await getAudioFromText(
					`Congratulations, it looks like you found an ${selectedGhost.name}! Make sure to select it in your Journal before leaving.`
				);
				//playAudio(url);
			}
		};
		updateURL();
	}, [selectedGhost]);

	const playAudio = (voice) => {
		if (voice && audioRef.current) {
			audioRef.current.src = voice;
			audioRef.current.play();
		}
	};

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
		[transcript]
	);

	const processTranscript = async (t) => {
		console.log("Processing Transcript. Loading State: ", loading);

		if (t.toLowerCase().includes("spectra")) {
			if (t.toLowerCase().includes("new") && t.toLowerCase().includes("contract")) {
				setSelectedEvidence([]);
				const voice = await getAudioFromText(
					"Sure, I went ahead and reset all of the evidence for you, you are now ready to begin your new contract."
				);
				//playAudio(voice);
				return;
			}

			console.log("Evidence Data in processTranscript: ", evidenceData);

			const response = getIntent(
				t.toLowerCase().replace("spectra", "").trim(),
				evidenceData,
				objectiveData,
				currentObjectives
			);

			const intent = response.intent;
			const json = response;
			const voiceResponse = json.response;

			console.log(json);

			if (intent === "add_objective") {
				setCurrentObjectives((prevObjectives) =>
					selectObjective(prevObjectives, json.objective)
				);
			}

			if (intent === "complete_objective") {
				setCurrentObjectives((prevObjectives) =>
					completeObjective(prevObjectives, json.objective)
				);
			}

			if (intent === "reset_objective") {
				setCurrentObjectives([]);
			}

			if (intent === "select_evidence") {
				json.evidence.map((evidence) => {
					console.log(evidence);
					const locatedEvidence = evidenceData.find(
						(e) => e.evidenceSlug === evidence.evidenceSlug
					);

					if (locatedEvidence) {
						setSelectedEvidence((prevEvidence) =>
							selectEvidence(prevEvidence, locatedEvidence)
						);
					} else {
						console.log("Could not match evidence.");
					}
				});
			}

			if (intent === "start_contract") {
				getAudioFromText(json.response);
			}

			if (intent === "unselect_evidence") {
				json.evidence.map((evidence) => {
					console.log(evidence);
					const locatedEvidence = evidenceData.find(
						(e) => e.evidenceSlug === evidence.evidenceSlug
					);

					if (locatedEvidence) {
						setSelectedEvidence((prevEvidence) =>
							removeEvidence(prevEvidence, locatedEvidence)
						);

						getAudioFromText(json.response);
					} else {
						console.log("Could not match evidence.");
					}
				});
			}

			if (intent === "not_evidence") {
				json.evidence.map((evidence) => {
					const locatedEvidence = evidenceData.find(
						(e) => e.evidenceSlug === evidence.evidenceSlug
					);

					if (locatedEvidence) {
						setSelectedEvidence((prevEvidence) =>
							notEvidence(prevEvidence, locatedEvidence)
						);

						getAudioFromText(json.response);
					}
				});
			}

			const voice = await getAudioFromText(voiceResponse);
			//playAudio(voice);
		}
	};

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
			//console.error("Speech recognition error:", event.error);
			if (event.error === "no-speech" || event.error === "audio-capture") {
				//recognitionRef.current.start();
			} else if (event.error === "not-allowed") {
				setIsSupported(false);
			}
		};

		console.log("Component Mounted. Loading State: ", loading);

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
				recognitionRef.current.onresult = null;
				recognitionRef.current.onend = null;
				recognitionRef.current.onerror = null;
			}
		};
	}, []);

	useEffect(() => {
		console.log("Loading state updated: ", loading);
		console.log("Evidence Data updated: ", evidenceData);
	}, [loading, evidenceData]);

	return !loading ? (
		<div className="spectra" onClick={toggleListening}>
			<AiOutlineRobot />
			<audio ref={audioRef} />
		</div>
	) : (
		<div>Loading...</div>
	);
};

export default SpectraController;
