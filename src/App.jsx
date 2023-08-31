import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/HomePage/Home';
import About from './pages/About/About';
import Detail from './pages/PokemonDetail/Detail';
import Favorites from './pages/Favorites/Favorites';

const App = () => {
	const [display, setDisplay] = useState(true);
	const [offset, setOffset] = useState(0);
	return (
		<div>
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
							/>
						}
					/>
					<Route path='/about' element={<About />} />
					<Route path='/detail/:pokemonId' element={<Detail />} />
					<Route path='/favorites' element={<Favorites />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
