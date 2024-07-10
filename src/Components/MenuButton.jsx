import React from "react";
import "./css/MenuButton.css";
import { useNavigate } from "react-router-dom";

const MenuButton = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div className="menu-button" onClick={() => navigate(item.link)}>
			{item.icon && item.icon}
			{item.name}
		</div>
	);
};

export default MenuButton;
