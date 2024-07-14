import React, { useEffect, useState } from "react"; // Import useEffect and useState
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

export default ObjectiveTile;
