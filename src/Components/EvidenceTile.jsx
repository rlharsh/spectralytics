import { BsBox } from "react-icons/bs";
import { FaThermometerQuarter } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { LuFlashlight } from "react-icons/lu";
import { PiCirclesThree } from "react-icons/pi";
import { RiRadarLine } from "react-icons/ri";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import PropTypes from "prop-types";
import "./css/EvidenceTile.css";

const EvidenceTile = ({ evidence, selected, onClick, count }) => {
	let className = "evidence-tile";

	if (selected === 1) {
		className += " evidence-tile--selected";
	} else if (selected === 2) {
		className += " evidence-tile--not-selected";
	}

	let icon;

	switch (evidence.evidenceSlug) {
		case "freezing":
			icon = <FaThermometerQuarter />;
			break;
		case "uv":
			icon = <LuFlashlight />;
			break;
		case "emf":
			icon = <RiRadarLine />;
			break;
		case "sb":
			icon = <BsBox />;
			break;
		case "orbs":
			icon = <PiCirclesThree />;
			break;
		case "writing":
			icon = <IoBookOutline />;
			break;
		case "dots":
			icon = <TfiLayoutGrid2 />;
			break;
	}

	return (
		<div className={className} onClick={() => onClick()}>
			<div className="flex-row">
				{count}
				{icon}
			</div>
			{evidence.name}
		</div>
	);
};

EvidenceTile.propTypes = {
	evidence: PropTypes.object.isRequired,
	selected: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	count: PropTypes.number.isRequired,
};

export default EvidenceTile;
