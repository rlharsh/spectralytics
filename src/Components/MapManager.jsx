import { useContext, useState } from "react";
import CenterModal from "./CenterModal";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import { GameDataContext } from "../Providers/GameDataProvider";
import "./css/MapManager.css";

const MapManager = () => {
	const { setSelectedMap, mapModalShowing, setMapModalShowing } =
		useContext(ApplicationContext);
	const { mapData } = useContext(GameDataContext ?? []);
	const [selectedMapId, setSelectedMapId] = useState("");

	const handleMapSet = () => {
		const selectedMap = mapData.find((map) => map.id === selectedMapId);
		console.log(selectedMap);
		setSelectedMap(selectedMap);
		setMapModalShowing(false);
	};

	const handleSelectChange = (e) => {
		console.log(e.target.value);
		setSelectedMapId(e.target.value);
	};

	return (
		mapModalShowing && (
			<CenterModal title="Select a map...">
				<div className="map-manager">
					<p>Select a map from the available options below.</p>
					<select
						className="custom-select"
						name="map"
						id="map"
						value={selectedMapId}
						onChange={handleSelectChange}
					>
						<option value="" disabled>
							Select a map
						</option>
						{mapData.map((map) => (
							<option key={map.id} value={map.id}>
								{map.mapName}
							</option>
						))}
					</select>
					<button onClick={handleMapSet} disabled={!selectedMapId}>
						Set Map
					</button>
				</div>
			</CenterModal>
		)
	);
};

export default MapManager;
