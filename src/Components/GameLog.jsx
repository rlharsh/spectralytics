import { useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./css/GameLog.css";
import { ApplicationContext } from "../Providers/ApplicationProvider";

const GameLog = () => {
	const { gameLogs } = useContext(ApplicationContext);

	const formatDateTime = (params) => {
		if (params.value) {
			const date = new Date(params.value);
			return date.toLocaleString();
		}
		return "";
	};

	const capitalizeWords = (params) => {
		if (params.value) {
			return params.value
				.split(" ")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
				.join(" ");
		}
		return "";
	};

	const colDefs = [
		{ field: "time", headerName: "Time", flex: 1, valueFormatter: formatDateTime },
		{ field: "type", headerName: "Type", flex: 1 },
		{ field: "status", headerName: "Status", flex: 1 },
		{ field: "sender", headerName: "Sender", flex: 1 },
		{
			field: "location",
			headerName: "Location",
			flex: 1,
			valueFormatter: capitalizeWords,
		},
		{ field: "evidence", headerName: "Evidence", flex: 1, hide: true },
		{ field: "description", headerName: "Description", flex: 1 },
	];

	return (
		<div className="game-log__container">
			<div className="game-log" style={{ height: "400px", width: "100%" }}>
				<h1>Evidence Log</h1>
				<div
					className="ag-theme-quartz-auto-dark"
					style={{ width: "100%", height: "100%" }}
				>
					<AgGridReact rowData={gameLogs} columnDefs={colDefs} />
				</div>
			</div>
		</div>
	);
};

export default GameLog;
