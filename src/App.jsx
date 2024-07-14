import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import ApplicationView from "./Views/ApplicationView";
import HomePage from "./Pages/HomePage";
import Contract from "./Pages/Contract";
import { ThemeProvider } from "@emotion/react";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ApplicationView />}>
					<Route index element={<HomePage />} />
					<Route path="contract" element={<Contract />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
