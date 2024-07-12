import axios from "axios";
import socket from "./socket";

const getAudioFromText = async (text) => {
	socket.emit("textToSpeech", text);
};

export { getAudioFromText };
