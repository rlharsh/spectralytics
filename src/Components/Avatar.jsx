import React from "react";
import "./css/Avatar.css";

const Avatar = ({ user }) => {
	return (
		<div className="avatar">
			{user?.displayName ?? "Unknown User"}
			<img
				src={user?.photoURL}
				alt={`Avatar of ${user?.displayName ?? "Unknown User"}`}
			/>
		</div>
	);
};

export default Avatar;
