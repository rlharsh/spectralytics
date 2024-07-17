import { useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./css/GameLog.css";
import { ApplicationContext } from "../Providers/ApplicationProvider";

const GameLog = () => {
	const { gameLogs } = useContext(ApplicationContext);

	const colDefs = [
		{ field: "time", headerName: "Time", flex: 1 },
		{ field: "type", headerName: "Status", flex: 1 },
		{ field: "location", headerName: "Location", flex: 1 },
		{ field: "evidence", headerName: "Evidence", flex: 1 },
		{ field: "description", headerName: "Description", flex: 1 },
	];

	const autoSizeStrategy = {
		type: "fitGridWidth",
		defaultMinWidth: 100,
		columnLimits: [
			{
				colId: "country",
				minWidth: 900,
			},
		],
	};

	return (
		<div className="game-log__container">
			<div className="game-log" style={{ height: "400px", width: "100%" }}>
				<h1>Evidence Log</h1>
				<div
					className="ag-theme-quartz-auto-dark"
					style={{ width: "100%", height: "100%" }}
				>
					<AgGridReact
						autoSizeStrategy={autoSizeStrategy}
						rowData={gameLogs}
						columnDefs={colDefs}
					/>
				</div>
			</div>
		</div>
	);
};

export default GameLog;
