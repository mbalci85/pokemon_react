import React, { useContext } from 'react';
import './About.css';
import { ThemeContext } from '../../contexts/ThemeContext';

const About = () => {
	const { darkMode } = useContext(ThemeContext);
	return (
		<div className={`about-container ${darkMode ? 'dark-mode' : ''}`}>
			<img
				src='https://static.posters.cz/image/hp/50800.jpg'
				alt='poke_poster'
				className='about-banner'
			/>
		</div>
	);
};

export default About;
