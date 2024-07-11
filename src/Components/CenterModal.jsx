import React, { useContext } from "react";
import "./css/CenterModal.css";
import { ApplicationContext } from "../Providers/ApplicationProvider";

const CenterModal = ({ title, children }) => {
	const { setSocketShowing } = useContext(ApplicationContext);

	const handleBackdropClick = (e) => {
		e.stopPropagation();
		setSocketShowing(false);
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

export default CenterModal;
