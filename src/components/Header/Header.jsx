import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<nav>
				<Link to='/' className='nav-item'>
					Home
				</Link>
				<Link to='/about' className='nav-item'>
					About
				</Link>
			</nav>
		</header>
	);
};

export default Header;
