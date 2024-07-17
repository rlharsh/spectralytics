import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
export const uuid = uuidv4();
const socket = io("http://localhost:3000", { query: { uuid } });
export default socket;
