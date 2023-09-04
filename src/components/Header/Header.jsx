import React, { useContext } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

const Header = ({ setDisplay, setOffset }) => {
	const { darkMode, setDarkMode } = useContext(ThemeContext);
	const navigate = useNavigate();
	const handleDisplay = () => {
		setDisplay(true);
		setOffset(0);
		navigate('/?page=1');
	};
	return (
		<header>
			<nav>
				<p onClick={handleDisplay} className='nav-item'>
					Home
				</p>
				<Link to='/about' className='nav-item'>
					About
				</Link>
				<Link to='/favorites' className='nav-item'>
					Favorites
				</Link>
			</nav>
			<button className='theme-btn' onClick={() => setDarkMode(!darkMode)}>
				{darkMode ? 'Light Mode' : 'Dark Mode'}
			</button>
		</header>
	);
};

export default Header;
