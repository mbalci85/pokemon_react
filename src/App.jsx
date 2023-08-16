import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/HomePage/Home';
import About from './pages/About/About';
import Detail from './pages/PokemonDetail/Detail';

const App = () => {
	const [display, setDisplay] = useState(true);
	return (
		<div>
			<Router>
				<Header display={display} setDisplay={setDisplay} />
				<Routes>
					<Route
						path='/'
						element={<Home display={display} setDisplay={setDisplay} />}
					/>
					<Route path='/about' element={<About />} />
					<Route path='/detail/:pokemonId' element={<Detail />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
