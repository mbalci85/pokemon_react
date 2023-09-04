import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/HomePage/Home';
import About from './pages/About/About';
import Detail from './pages/PokemonDetail/Detail';
import Favorites from './pages/Favorites/Favorites';
import ThemeContextProvider from './contexts/ThemeContext';

const App = () => {
	const [display, setDisplay] = useState(true); //when user searches, next-prev page buttons and go to page form will be disappeared
	const [offset, setOffset] = useState(0);
	const [favPokes, setFavPokes] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem('fav-pokes')) {
			localStorage.setItem('fav-pokes', '[]');
		} else {
			setFavPokes(JSON.parse(localStorage.getItem('fav-pokes')));
		}
	}, []);
	return (
		<div>
			<ThemeContextProvider>
				<Router>
					<Header setDisplay={setDisplay} setOffset={setOffset} />
					<Routes>
						<Route
							path='/'
							element={
								<Home
									display={display}
									setDisplay={setDisplay}
									offset={offset}
									setOffset={setOffset}
									favPokes={favPokes}
									setFavPokes={setFavPokes}
								/>
							}
						/>
						<Route path='/about' element={<About />} />
						<Route path='/detail/:pokemonId' element={<Detail />} />
						<Route
							path='/favorites'
							element={
								<Favorites
									favPokes={favPokes}
									setFavPokes={setFavPokes}
								/>
							}
						/>
					</Routes>
					<Footer />
				</Router>
			</ThemeContextProvider>
		</div>
	);
};

export default App;
