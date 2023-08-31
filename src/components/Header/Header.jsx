import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ setDisplay, setOffset }) => {
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
		</header>
	);
};

export default Header;
