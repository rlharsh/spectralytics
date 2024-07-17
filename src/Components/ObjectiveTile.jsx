import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./css/ObjectiveTile.css";

const ObjectiveTile = ({ objective, click, selected }) => {
	const [isChecked, setIsChecked] = useState(selected);

	useEffect(() => {
		setIsChecked(selected);
	}, [selected]);

	const handleChange = () => {
		click(objective);
	};

	return (
		<div className="objective-tile">
			<div className="objective-tile__left">
				{!objective?.complete ? (
					<>
						<input
							type="checkbox"
							name="objective"
							id={objective.id}
							onChange={handleChange}
							checked={isChecked}
						/>
						<label
							htmlFor={objective.id}
							className={objective?.complete ? "strikethrough" : null}
						>
							{objective?.name}
						</label>
					</>
				) : (
					<p className="strikethrough">{objective.name}</p>
				)}
			</div>
		</div>
	);
};

ObjectiveTile.propTypes = {
	objective: PropTypes.object.isRequired,
	click: PropTypes.func.isRequired,
	selected: PropTypes.func.isRequired,
};

export default ObjectiveTile;
