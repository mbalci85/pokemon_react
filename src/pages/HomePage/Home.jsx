import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const Home = () => {
	const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

	const [pokeCards, setPokeCards] = useState([]);

	useEffect(() => {
		axios
			.get(BASE_URL)
			.then((res) => {
				setPokeCards(res.data.results);
				console.log(res.data.results);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='all-cards-container'>
			{pokeCards.map((poke) => {
				return <PokemonCard pokemon={poke} key={poke.url} />;
			})}
		</div>
	);
};

export default Home;
