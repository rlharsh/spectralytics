import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./css/SpectraController.css";
import { AiOutlineRobot } from "react-icons/ai";
import { getAudioFromText } from "../Helpers/textToSpeech";
import { getIntent } from "../Helpers/nlpProcessor";
import { ApplicationContext } from "../Providers/ApplicationProvider";

const SpectraController = () => {
	const [isSupported, setIsSupported] = useState(true);
	const [transcript, setTranscript] = useState(null);
	const [listening, setListening] = useState(false);

	const { awaitingAudio, setAwaitingAudio } = useContext(ApplicationContext);

	const recognitionRef = useRef(null);
	const wakeWordHeardRef = useRef(false);
	const silenceTimeoutRef = useRef(null);
	const audioRef = useRef(null);

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

	const handleResult = useCallback((event) => {
		let newTranscript = "";
		for (let i = event.resultIndex; i < event.results.length; i++) {
			newTranscript += event.results[i][0].transcript;
		}

		if (silenceTimeoutRef.current) {
			clearTimeout(silenceTimeoutRef.current);
		}

		processTranscript(newTranscript.toLocaleLowerCase());
		setTranscript(newTranscript);
	}, []);

	const processTranscript = async (t) => {
		if (t.toLowerCase().includes("spectra")) {
			const response = await getIntent(t);
			setAwaitingAudio(true);
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
			console.error("Speech recognition error:", event.error);
			if (event.error === "no-speech" || event.error === "audio-capture") {
				recognitionRef.current.start();
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

	return (
		<div className="spectra" onClick={toggleListening}>
			<AiOutlineRobot />
			<audio ref={audioRef} />
		</div>
	);
};

export default SpectraController;
