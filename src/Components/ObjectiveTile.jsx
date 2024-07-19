import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./css/ObjectiveTile.css";
import { IoIosInformationCircle } from "react-icons/io";

const ObjectiveTile = ({ objective, click, selected, modalClick }) => {
	const [isChecked, setIsChecked] = useState(selected);

	useEffect(() => {
		setIsChecked(selected);
	}, [selected]);

	const handleChange = () => {
		console.log("");
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
			<div className="objective-tile__right">
				<button onClick={() => modalClick(objective)}>
					<IoIosInformationCircle />
				</button>
			</div>
		</div>
	);
};

ObjectiveTile.propTypes = {
	objective: PropTypes.object.isRequired,
	click: PropTypes.func.isRequired,
	selected: PropTypes.func.isRequired,
	modalClick: PropTypes.func.isRequired,
};

export default ObjectiveTile;
