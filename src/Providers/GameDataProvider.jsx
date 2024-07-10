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

	const getCollection = async (collectionName) => {
		try {
			const storedData = localStorage.getItem(collectionName);
			if (storedData) {
				return JSON.parse(storedData);
			} else {
				const collectionRef = collection(db, collectionName);
				const snapshot = await getDocs(collectionRef);
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				localStorage.setItem(collectionName, JSON.stringify(data));
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
		};

		initializeData();
	}, []);

	const values = {
		evidenceData,
		difficultyData,
		ghostData,
		mapData,
		objectiveData,
	};

	return <GameDataContext.Provider value={values}>{children}</GameDataContext.Provider>;
};

export default GameDataProvider;
