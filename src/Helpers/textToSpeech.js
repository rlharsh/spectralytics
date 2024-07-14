import axios from "axios";
import socket from "./socket";

const getAudioFromText = async (text) => {
	/*
	const options = {
		method: "POST",
		url: "https://realistic-text-to-speech.p.rapidapi.com/v3/generate_voice_over_v2",
		headers: {
			"x-rapidapi-key": "74ecc3bf46msh16c4d98053bf77dp107152jsn5cccc0dc32c6",
			"x-rapidapi-host": "realistic-text-to-speech.p.rapidapi.com",
			"Content-Type": "application/json",
		},
		data: {
			voice_obj: {
				id: 2014,
				voice_id: "en-US-Neural2-F",
				gender: "Femail",
				language_code: "en-US",
				language_name: "US English",
				voice_name: "Ava",
				sample_text: "Hello, hope you are having a great time making your video.",
				sample_audio_url:
					"https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-A16831901130600.mp3",
				status: 2,
				rank: 0,
				type: "google_tts",
				isPlaying: false,
			},
			json_data: [
				{
					block_index: 0,
					text: text,
				},
			],
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data[0].link);
		return response.data[0].link;
	} catch (error) {
		console.error(error);
	}
		*/

	// socket.emit("textToSpeech", text);

	const synth = window.speechSynthesis;
	const utterThis = new SpeechSynthesisUtterance(text);

	// Find and set the desired voice
	const voices = synth.getVoices();
	const desiredVoice = voices.find((voice) => voice.name === "Google US English");

	if (desiredVoice) {
		utterThis.voice = desiredVoice;
	} else {
		console.warn("Google US English voice not found. Using default voice.");
	}

	// Speak the text
	synth.speak(utterThis);
};

export { getAudioFromText };
