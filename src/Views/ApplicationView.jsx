import React from "react";
import { auth } from "../Configuration/Firebase";
import { AuthProvider } from "../Providers/AuthProvider";
import Header from "../Components/Header";
import Console from "../Components/Console";
import { Outlet } from "react-router-dom";
import ApplicationProvider from "../Providers/ApplicationProvider";
import GameDataProvider from "../Providers/GameDataProvider";
import SpectraController from "../Components/SpectraController";

const ApplicationView = () => {
	return (
		<ApplicationProvider>
			<AuthProvider auth={auth}>
				<GameDataProvider>
					<div className="app-view">
						<Header />
						<Outlet />
						<SpectraController />
					</div>
				</GameDataProvider>
			</AuthProvider>
		</ApplicationProvider>
	);
};

export default ApplicationView;
