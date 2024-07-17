import { useState } from "react";
import PropTypes from "prop-types";
import "./css/CollapsablePanel.css";
import { AiOutlineExpandAlt, AiOutlineShrink } from "react-icons/ai";

const CollapsablePanel = ({ title, children }) => {
	const [expanded, setExpanded] = useState(true);
	const handleExpandButtonClick = () => {
		setExpanded((prevState) => !prevState);
	};

	return (
		<div className="collapsable-panel">
			<div className="collapsable-panel__header">
				<h2>{title}</h2>
				<button onClick={() => handleExpandButtonClick()}>
					{expanded ? <AiOutlineShrink /> : <AiOutlineExpandAlt />}
				</button>
			</div>
			{expanded && <div className="collapsable-panel__content">{children}</div>}
		</div>
	);
};

CollapsablePanel.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};
export default CollapsablePanel;
