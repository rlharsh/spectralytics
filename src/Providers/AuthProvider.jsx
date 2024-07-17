import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({
	user: null,
	loading: true,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ auth, children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const db = getFirestore(); // Initialize Firestore

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, [auth]);

	const login = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			console.log(result.user);
			setUser(result.user);
		} catch (error) {
			console.error("Error logging in with Google:", error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	const values = {
		user,
		loading,
		login,
		logout,
		db,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	auth: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired,
};

export const useAuth = () => {
	return useContext(AuthContext);
};
