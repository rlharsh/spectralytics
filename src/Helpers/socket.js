import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export const uuid = uuidv4();

console.log(import.meta.env.MODE);

const socketUrl =
	import.meta.env.MODE === "production"
		? import.meta.env.VITE_SOCKET_URL_PRODUCTION
		: import.meta.env.VITE_SOCKET_URL_LOCAL;

const socket = io(socketUrl, {
	query: { uuid },
});

export default socket;
