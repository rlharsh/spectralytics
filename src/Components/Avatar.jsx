import PropTypes from "prop-types";
import "./css/Avatar.css";
import { useContext } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import { PiNetworkThin } from "react-icons/pi";

const Avatar = ({ user, click }) => {
	const { setSocketShowing, connectedUsers } = useContext(ApplicationContext);

	return (
		<div className="avatar-wrapper">
			<div className="avatar" onClick={click}>
				{user?.displayName ?? "Unknown User"}
				<img
					src={user?.photoURL}
					alt={`Avatar of ${user?.displayName ?? "Unknown User"}`}
				/>
			</div>
			<div className="network-information">
				<button
					className="button-highlight"
					onClick={() => setSocketShowing((prevState) => !prevState)}
				>
					<PiNetworkThin />
					<p>Network Information</p>
				</button>
				<div className="flex-row">
					<p>Users Online:</p>
					<p>{connectedUsers}</p>
				</div>
			</div>
		</div>
	);
};

Avatar.propTypes = {
	user: PropTypes.object.isRequired,
	click: PropTypes.func.isRequired,
};

export default Avatar;
