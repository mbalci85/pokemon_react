import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ display, setDisplay }) => {
	const navigate = useNavigate();
	const handleDisplay = () => {
		setDisplay(true);
		navigate('/');
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
			</nav>
		</header>
	);
};

export default Header;
