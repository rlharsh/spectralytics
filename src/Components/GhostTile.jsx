import { useContext, useState } from "react";
import "./css/GhostTile.scss";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import { FaThermometerFull } from "react-icons/fa";
import { LuFlashlight } from "react-icons/lu";
import { RiRadarLine } from "react-icons/ri";
import { PiBrain, PiCirclesThree, PiFootprintsLight } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { BiQuestionMark } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import PropTypes from "prop-types";
import { TbGhost2Filled } from "react-icons/tb";

const GhostTile = ({ ghost }) => {
	const { selectedEvidence, mps } = useContext(ApplicationContext);

	const isEvidenceSelected = (clue) => {
		const match = selectedEvidence.find((item) => item.evidenceSlug === clue);
		return !!match;
	};

	const [collapsed, setCollapsed] = useState(false);

	const bpmMatch = () => {
		console.log(mps);
		return mps >= ghost.speedMin - 0.1 && mps <= ghost.speedMax + 0.1;
	};

	const handleTileClick = () => {
		setCollapsed((prevState) => !prevState);
	};

	const getIcon = (slug) => {
		switch (slug) {
			case "freezing":
				return <FaThermometerFull />;
			case "uv":
				return <LuFlashlight />;
			case "emf":
				return <RiRadarLine />;
			case "sb":
				return <BsBox />;
			case "orbs":
				return <PiCirclesThree />;
			case "writing":
				return <IoBookOutline />;
			case "dots":
				return <TfiLayoutGrid2 />;
			default:
				return <BiQuestionMark />;
		}
	};

	return (
		<div
			className={`ghost-tile ${bpmMatch() ? "ghost-tile--selected" : null}`}
			onClick={() => handleTileClick()}
		>
			<header className="ghost-tile__header">
				<h2>
					<TbGhost2Filled />
					{ghost.name}
				</h2>
				<button className="button-card">
					<AiOutlineEllipsis />
				</button>
			</header>
			{!collapsed && (
				<div className="ghost-tile__content">
					<h3 className="accent-text">Game Description</h3>
					<p>{ghost.description}</p>
				</div>
			)}
			<footer
				className={`ghost-tile__footer ${
					collapsed ? "ghost-tile__footer--collapsed" : null
				}`}
			>
				<div className="ghost-tile__footer__left">
					{!collapsed && (
						<div className="ghost-tile__slug ghost-tile__speed">
							<PiFootprintsLight />
							{ghost.speedMin === ghost.speedMax
								? ghost.speedMin
								: `${ghost.speedMin}-${ghost.speedMax}`}
						</div>
					)}
					{!collapsed && (
						<div className="ghost-tile__slug ghost-tile__sanity">
							<PiBrain />
							{ghost.huntMin === ghost.huntMax
								? `${ghost.huntMin}%`
								: `${ghost.huntMin}-${ghost.huntMax}%`}
						</div>
					)}
				</div>
				<div
					className={`ghost-tile__clues ${
						collapsed ? "ghost-tile__clues--collapsed" : null
					}`}
				>
					{ghost.clues
						.sort((a, b) => {
							const aMatch = isEvidenceSelected(a);
							const bMatch = isEvidenceSelected(b);

							if (!aMatch && bMatch) return -1;
							if (aMatch && !bMatch) return 1;

							return a < b ? -1 : a > b ? 1 : 0;
						})
						.map((clue) => (
							<span
								key={clue}
								className={`clue ${isEvidenceSelected(clue) ? "accent-svg" : null}`}
							>
								{getIcon(clue)}
							</span>
						))}
				</div>
			</footer>
		</div>
	);
};

GhostTile.propTypes = {
	ghost: PropTypes.object.isRequired,
};

export default GhostTile;
