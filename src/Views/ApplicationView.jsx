// ApplicationView.jsx
import React, { useContext } from "react";
import { auth } from "../Configuration/Firebase";
import { AuthProvider } from "../Providers/AuthProvider";
import Header from "../Components/Header";
import Console from "../Components/Console";
import { Outlet } from "react-router-dom";
import ApplicationProvider from "../Providers/ApplicationProvider";
import GameDataProvider from "../Providers/GameDataProvider";
import SpectraController from "../Components/SpectraController";
import SocketManager from "../Components/SocketManager";
import { ThemeContext, ThemeProvider } from "../Providers/ThemeProvider";
import ThemeToggleButton from "../Components/ThemeToggleButton";

const ApplicationView = () => {
	const { theme } = useContext(ThemeContext);
	return (
		<ApplicationProvider>
			<AuthProvider auth={auth}>
				<GameDataProvider>
					<div className={`App ${theme} app-view`}>
						<SocketManager />
						<Header />
						<Outlet />
					</div>
				</GameDataProvider>
			</AuthProvider>
		</ApplicationProvider>
	);
};

export default ApplicationView;
