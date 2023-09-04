import React, { createContext, useState } from 'react';

export const ThemeContext = createContext({});

const ThemeContextProvider = (props) => {
	const [darkMode, setDarkMode] = useState(
		JSON.parse(localStorage.getItem('dark-mode') || false) //darkMode is set according to local storage or false, if user's first time 'toggleMode' sets localStorage when mode changes
	);

	const toggleMode = () => {
		let currentMode = darkMode;
		setDarkMode(!currentMode);
		localStorage.setItem('dark-mode', JSON.stringify(!currentMode));
	};

	return (
		<ThemeContext.Provider value={{ darkMode, toggleMode }}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
