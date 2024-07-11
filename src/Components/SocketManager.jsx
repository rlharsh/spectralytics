import React, { useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import CenterModal from "./CenterModal";
import "./css/SocketManager.css";

const SocketManager = () => {
	const { socketShowing, setSocketShowing, userId, setUserId } =
		useContext(ApplicationContext);

	const socketRef = useRef();

	if (!socketRef.current) {
		socketRef.current = io("http://localhost:3000");
	}

	const socket = socketRef.current;

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");

		if (storedUserId) {
			setUserId(storedUserId);
			socket.emit("joinRoom", storedUserId);
		} else {
			socket.on("userId", (id) => {
				localStorage.setItem("userId", id);
				setUserId(id);
				console.log(id);
			});
		}

		return () => {
			socket.off("userId");
		};
	}, [setUserId, socket]);

	return (
		socketShowing && (
			<CenterModal title="Network Information">
				<div className="input-row">
					<p>
						Below you will find your network identification number. Keep this
						identification number in a safe place, and share with only those with whom
						you wish to have access to your data. <br />
						<br />
						You can copy this identification number using the button below.
					</p>
					<div className="input-row">
						<input
							className="center-text"
							type="text"
							name="socket-id"
							id="socket-id"
							placeholder={userId}
							value={userId}
						/>
						<button>Copy</button>
						<button className="highlight" onClick={() => setSocketShowing(false)}>
							Close
						</button>
					</div>
				</div>
			</CenterModal>
		)
	);
};

export default SocketManager;
