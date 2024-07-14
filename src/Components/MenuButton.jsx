import React from "react";
import "./css/MenuButton.css";
import { useNavigate } from "react-router-dom";

const MenuButton = ({ item, click }) => {
	const navigate = useNavigate();

	return (
		<div className="menu-button" onClick={() => click()}>
			{item.icon && item.icon}
			<p>{item.name}</p>
		</div>
	);
};

export default MenuButton;
