import React, { useContext } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import "./css/BeatManager.css";
import SpeedChart from "./SpeedChart";

const BeatManager = () => {
	const { bpm, mps, handleTap, setBpm, setMps } = useContext(ApplicationContext);

	const handleResetLink = () => {
		setBpm(0);
		setMps(0);
	};

	return (
		<div className="beat-manager">
			<div className="beat-display">
				{bpm.toFixed(1)} BPM / {mps.toFixed(2)} MPS
			</div>
			<button className="tap-button" onClick={handleTap}>
				TAP
			</button>
			<a href="#" onClick={handleResetLink}>
				Reset Meter
			</a>
			<SpeedChart />
		</div>
	);
};

export default BeatManager;
