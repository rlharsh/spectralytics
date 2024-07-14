import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { collection, getDocs } from "firebase/firestore";

export const GameDataContext = createContext(null);

const GameDataProvider = ({ children }) => {
	const { db } = useAuth();

	const [difficultyData, setDifficultyData] = useState([]);
	const [evidenceData, setEvidenceData] = useState([]);
	const [ghostData, setGhostData] = useState([]);
	const [mapData, setMapData] = useState([]);
	const [objectiveData, setObjectiveData] = useState([]);
	const [loading, setLoading] = useState(true);

	const getCollection = async (collectionName) => {
		try {
			const storedData = localStorage.getItem(collectionName);
			if (storedData) {
				console.log(`Loaded ${collectionName} from localStorage`);
				return JSON.parse(storedData);
			} else {
				const collectionRef = collection(db, collectionName);
				const snapshot = await getDocs(collectionRef);
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				localStorage.setItem(collectionName, JSON.stringify(data));
				console.log(`Fetched ${collectionName} from Firebase`);
				return data;
			}
		} catch (error) {
			console.error("Error getting data from Firebase: ", error);
			return [];
		}
	};

	useEffect(() => {
		const initializeData = async () => {
			const eData = await getCollection("evidenceData");
			const dData = await getCollection("DifficultyData");
			const gData = await getCollection("ghostData");
			const mData = await getCollection("mapData");
			const oData = await getCollection("objectiveData");

			setEvidenceData(eData);
			setDifficultyData(dData);
			setGhostData(gData);
			setMapData(mData);
			setObjectiveData(oData);

			setLoading(false);

			// Debugging logs
			console.log("Evidence Data: ", eData);
			console.log("Difficulty Data: ", dData);
			console.log("Ghost Data: ", gData);
			console.log("Map Data: ", mData);
			console.log("Objective Data: ", oData);
			console.log("Loading State after initialization: ", loading);
		};

		initializeData();
	}, []);

	const values = {
		evidenceData,
		difficultyData,
		ghostData,
		mapData,
		objectiveData,
		loading,
	};

	return <GameDataContext.Provider value={values}>{children}</GameDataContext.Provider>;
};

export default GameDataProvider;
