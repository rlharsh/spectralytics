import "./css/Sidebar.css";
import { GoPlus } from "react-icons/go";
import EvidenceManager from "./EvidenceManager";
import ObjectiveManager from "./ObjectiveManager";
import ContractInformation from "./ContractInformation";
import Avatar from "./Avatar";
import { useAuth } from "../Providers/AuthProvider";
import BeatManager from "./BeatManager";

const Sidebar = ({ visible }) => {
	const { user, login } = useAuth();

	return (
		<div className={`sidebar ${!visible ? "sidebar--hidden" : null}`}>
			<div className="sidebar__top flex-row--space">
				<h1>Spectralytics</h1>
				<button>
					<GoPlus /> New Contract
				</button>
			</div>
			<ObjectiveManager />
			<BeatManager />
			<div className="sidebar__bottom">
				<Avatar user={user} click={login} />
			</div>
		</div>
	);
};

export default Sidebar;
