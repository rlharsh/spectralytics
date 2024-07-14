// ThemeToggleButton.js
import React, { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ThemeToggleButton = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<button onClick={() => toggleTheme()}>
			{theme === "dark-theme" ? <IoSunnyOutline /> : <IoMoonOutline />}
		</button>
	);
};

export default ThemeToggleButton;
