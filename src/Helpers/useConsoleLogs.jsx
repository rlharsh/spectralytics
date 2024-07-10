import { useContext } from "react";
import { ApplicationContext } from "../Providers/ApplicationProvider";

const useConsoleLogs = () => {
	const { consoleLogs, setConsoleLogs } = useContext(ApplicationContext);

	const updateConsoleLogs = (item) => {
		setConsoleLogs((prevLogs) => [
			...prevLogs,
			{ message: item, date: new Date().toISOString() },
		]);
	};

	const getConsoleLogs = () => {
		return consoleLogs;
	};

	return {
		consoleLogs,
		updateConsoleLogs,
		getConsoleLogs,
	};
};

export default useConsoleLogs;
