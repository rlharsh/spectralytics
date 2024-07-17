import "./css/MenuButton.css";
import PropTypes from "prop-types";

const MenuButton = ({ item, click }) => {
	return (
		<div className="menu-button" onClick={() => click()}>
			{item.icon && item.icon}
			<p>{item.name}</p>
		</div>
	);
};

MenuButton.propTypes = {
	item: PropTypes.object.isRequired,
	click: PropTypes.func.isRequired,
};

export default MenuButton;
