import socket from "./socket";

const getIntent = async (text) => {
	socket.emit("nlp", text);
};

export { getIntent };
