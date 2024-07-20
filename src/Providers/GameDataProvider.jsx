import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import PropTypes from "prop-types";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const GameDataContext = createContext(null);

const GameDataProvider = ({ children }) => {
	const { db } = useAuth();

	const [difficultyData, setDifficultyData] = useState([]);
	const [evidenceData, setEvidenceData] = useState([]);
	const [ghostData, setGhostData] = useState([]);
	const [mapData, setMapData] = useState([]);
	const [objectiveData, setObjectiveData] = useState([]);
	const [loading, setLoading] = useState(true);

	const getCollection = useCallback(
		async (collectionName) => {
			try {
				const storedData = localStorage.getItem(collectionName);
				if (storedData) {
					return JSON.parse(storedData);
				} else {
					if (!db) {
						throw new Error("Firestore database instance is not available");
					}
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
		},
		[db]
	);

	useEffect(() => {
		const initializeData = async () => {
			const eData = await getCollection("evidenceData");
			const dData = await getCollection("difficultyData");
			const gData = await getCollection("ghostData");
			const mData = await getCollection("mapData");
			const oData = await getCollection("objectiveData");

			setEvidenceData(eData);
			setDifficultyData(dData);
			setGhostData(gData);
			setMapData(mData);
			setObjectiveData(oData);

			setLoading(false);
		};

		initializeData();
	}, [getCollection]);

	const writeGameLog = async (contractData) => {
		try {
			if (!db) {
				throw new Error("Firestore database instance is not available");
			}
			const colRef = collection(db, "contractLogs");
			const docRef = await addDoc(colRef, contractData);
			console.log("Document written with ID: ", docRef.id);
		} catch (error) {
			console.error("Error writing game log: ", error);
		}
	};

	const values = {
		evidenceData,
		difficultyData,
		ghostData,
		mapData,
		objectiveData,
		loading,
		writeGameLog,
	};

	return <GameDataContext.Provider value={values}>{children}</GameDataContext.Provider>;
};

GameDataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GameDataProvider;
