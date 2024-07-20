// ApplicationView.jsx
import { useContext } from "react";
import { auth } from "../Configuration/Firebase";
import { AuthProvider } from "../Providers/AuthProvider";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import ApplicationProvider from "../Providers/ApplicationProvider";
import GameDataProvider from "../Providers/GameDataProvider";
import SocketManager from "../Components/SocketManager";
import { ThemeContext } from "../Providers/ThemeProvider";

const ApplicationView = () => {
	const { theme } = useContext(ThemeContext);
	return (
		<AuthProvider auth={auth}>
			<GameDataProvider>
				<ApplicationProvider>
					<div className={`App ${theme} app-view`}>
						<SocketManager />
						<Header />
						<Outlet />
					</div>
				</ApplicationProvider>
			</GameDataProvider>
		</AuthProvider>
	);
};

export default ApplicationView;
