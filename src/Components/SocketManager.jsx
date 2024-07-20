import React, { useContext, useEffect } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import CenterModal from "./CenterModal";
import "./css/SocketManager.css";
import socket, { uuid } from "../Helpers/socket";

const SocketManager = () => {
	const { socketShowing, setUserId, setConnectedUsers } =
		useContext(ApplicationContext);

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");

		if (storedUserId) {
			setUserId(storedUserId);
			socket.emit("joinRoom", uuid);
		}

		socket.on("roomConnected", (id) => {
			localStorage.setItem("userId", id);
			setUserId(id);
		});

		socket.on("connectedUsers", (users) => {
			setConnectedUsers(users);
		});

		socket.on("disconnect", (users) => {
			setConnectedUsers(users);
		});

		socket.on("objectiveBuffers", (buffer) => {
			console.log("Received some objective data: ", buffer);
		});

		socket.on("userJoined", (userId) => {
			console.log(`User with ID ${userId} joined the room.`);
		});

		return () => {
			socket.off("speechResult");
		};
	}, []);

	return (
		<React.Fragment>
			{socketShowing && (
				<CenterModal title="Network Information">
					<div className="input-row">
						<p>
							Below you will find your network identification number. Keep this
							identification number in a safe place, and share with only those with whom
							you wish to have access to your data.
						</p>
						<div className="input-row">
							<input
								className="center-text"
								type="text"
								name="socket-id"
								id="socket-id"
								placeholder={uuid}
								value={uuid}
							/>
							<button
								onClick={(e) => {
									e.preventDefault();
									navigator.clipboard.writeText(uuid);
								}}
							>
								Copy
							</button>
						</div>
					</div>
				</CenterModal>
			)}
		</React.Fragment>
	);
};

export default SocketManager;
