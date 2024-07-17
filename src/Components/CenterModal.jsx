import { useContext } from "react";
import PropTypes from "prop-types";
import "./css/CenterModal.css";
import { ApplicationContext } from "../Providers/ApplicationProvider";

const CenterModal = ({ title, children }) => {
	const { setSocketShowing, setMapModalShowing, setDifficultyModalShowing } =
		useContext(ApplicationContext);

	const handleBackdropClick = () => {
		setSocketShowing(false);
		setMapModalShowing(false);
		setDifficultyModalShowing(false);
	};

	const handleContentClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div className="center-modal" onClick={handleBackdropClick}>
			<div onClick={handleContentClick} className="center-modal__content">
				<div className="center-modal__title">
					<h1>{title}</h1>
				</div>
				{children}
			</div>
		</div>
	);
};

CenterModal.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default CenterModal;
