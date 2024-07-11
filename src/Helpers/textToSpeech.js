import axios from "axios";

const getAudioFromText = async (text) => {
	const options = {
		method: "Get",
		url: "https://microsoft-edge-text-to-speech.p.rapidapi.com/TTS/EdgeTTS",
		params: {
			text: text,
			voice_name: "en-GB-MiaNeural",
		},
		headers: {
			"x-rapidapi-key": "74ecc3bf46msh16c4d98053bf77dp107152jsn5cccc0dc32c6",
			"x-rapidapi-host": "microsoft-edge-text-to-speech.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export { getAudioFromText };
