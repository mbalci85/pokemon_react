import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const Home = () => {
	const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

	const [pokeCards, setPokeCards] = useState([]);

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const response = await axios.get(BASE_URL);
				setPokeCards(response.data.results);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPokemons();
	}, []);

	return (
		<>
			{pokeCards && (
				<div className='all-cards-container'>
					<h1>POKEMONS</h1>
					<main className='all-cards'>
						{pokeCards.map((poke) => {
							return <PokemonCard pokemon={poke} key={poke.url} />;
						})}
					</main>
				</div>
			)}
		</>
	);
};

export default Home;
