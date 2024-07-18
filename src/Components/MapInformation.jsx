import { useContext } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import "./css/MapInformation.css";

const MapInformation = () => {
	const { selectedMap } = useContext(ApplicationContext);

	return (
		<div className="map-info-main">
			{selectedMap && (
				<div className="map-info-container">
					<h2 className="map-info-title">Available Rooms</h2>
					<div className="room-list">
						{selectedMap.rooms.map((r) => (
							<div key={r.id} className="room-item">
								{r}
							</div>
						))}
					</div>
				</div>
			)}
			{/* <h2 className="map-info-title">Cursed Object Locations</h2> */}
		</div>
	);
};

export default MapInformation;
