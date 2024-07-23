import { useContext, useEffect } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import "./css/MapInformation.css";
import { IoInformation } from "react-icons/io5";
import { BsLightning } from "react-icons/bs";

const MapInformation = () => {
	const { selectedMap } = useContext(ApplicationContext);

	useEffect(() => {
		console.log(selectedMap);
	}, [selectedMap]);

	return (
		<div className="map-info-main">
			<h2>{selectedMap?.mapName ?? "Unknown"} Rooms</h2>
			{selectedMap && (
				<div className="map-info-container">
					<div className="rooms">
						{selectedMap?.rooms.map((floor) => (
							<div key={floor.title}>
								<h3>{floor.title}</h3>
								{floor?.rooms.map((room) => (
									<div key={room} className="flex-room">
										{room.fusebox ? <BsLightning /> : ""}
										{room.cursed?.item ? <IoInformation /> : ""}
										<p key={room.name}>{room.name}</p>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default MapInformation;
