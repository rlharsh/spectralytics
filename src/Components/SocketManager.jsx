import React, { useContext, useEffect, useRef, useState } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import CenterModal from "./CenterModal";
import "./css/SocketManager.css";
import socket from "../Helpers/socket";
import { getAudioFromText } from "../Helpers/textToSpeech";

const SocketManager = () => {
	const {
		socketShowing,
		setSocketShowing,
		userId,
		setUserId,
		connectedUsers,
		setConnectedUsers,
	} = useContext(ApplicationContext);

	const audioRef = useRef(new Audio());
	const [audioBuffer, setAudioBuffer] = useState(null);
	const [autoplayInitiated, setAutoplayInitiated] = useState(false);

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");

		if (storedUserId) {
			setUserId(storedUserId);
			socket.emit("joinRoom", storedUserId);
		} else {
			socket.on("userId", (id) => {
				localStorage.setItem("userId", id);
				setUserId(id);
			});
		}

		socket.on("connectedUsers", (users) => {
			setConnectedUsers(users);
		});

		socket.on("disconnect", (users) => {
			setConnectedUsers(users);
		});

		socket.on("speechResult", (buffer) => {
			console.log("Received audio buffer:", buffer);
			setAudioBuffer(buffer);
		});

		return () => {
			socket.off("speechResult");
		};
	}, []);

	useEffect(() => {
		if (audioBuffer) {
			try {
				const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
				const url = URL.createObjectURL(blob);

				audioRef.current.src = "";
				audioRef.current.src = url;
				audioRef.current.load();
				console.log(url);

				if (audioBuffer) {
					audioRef.current.play().catch((error) => {
						console.error("Error playing audio:", error);
					});
					setAutoplayInitiated(true);
				}
			} catch (error) {
				console.error("Error creating object URL:", error);
			}
		}
	}, [audioBuffer]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.controls = false;
			audioRef.current.muted = false;
		}
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
								placeholder={userId}
								value={userId}
							/>
							<button>Copy</button>
							<button className="highlight" onClick={() => setSocketShowing(false)}>
								Close
							</button>
						</div>
					</div>
					<audio
						key={
							audioBuffer
								? URL.createObjectURL(new Blob([audioBuffer], { type: "audio/mpeg" }))
								: ""
						}
						ref={audioRef}
						controls={false}
					/>
				</CenterModal>
			)}
		</React.Fragment>
	);
};

export default SocketManager;
