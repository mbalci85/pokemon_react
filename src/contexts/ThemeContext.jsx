import React, { createContext, useState } from 'react';

export const ThemeContext = createContext([]);

const ThemeContextProvider = (props) => {
	const [darkMode, setDarkMode] = useState(false);
	const [darkModeStyle, setDarkModeStyle] = useState({
		backgroundColor: 'black',
		color: 'white',
	});
	return (
		<ThemeContext.Provider
			value={{ darkMode, setDarkMode, darkModeStyle, setDarkModeStyle }}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
