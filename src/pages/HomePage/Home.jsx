import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const Home = () => {
	const [pokeCards, setPokeCards] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [searchResult, setSearchResult] = useState('');

	let BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

	const fetchPokemons = async (search) => {
		if (search) {
			BASE_URL = `https://pokeapi.co/api/v2/pokemon/${search}`;
			try {
				const response = await axios.get(BASE_URL);
				setSearchResult(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const response = await axios.get(BASE_URL);
				setPokeCards(response.data.results);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		fetchPokemons();
	}, []);

	const searchByName = (e) => {
		e.preventDefault();
		fetchPokemons(userInput);
	};

	return (
		<>
			{pokeCards &&
				(searchResult ? (
					<p>Deneme</p>
				) : (
					<div className='all-cards-container'>
						<h1>POKEMONS</h1>
						<form onSubmit={searchByName}>
							<input
								type='text'
								placeholder='Search by Name or ID'
								value={userInput}
								onChange={(e) => {
									setUserInput(e.target.value);
								}}
							/>
							<button type='submit'>Search</button>
						</form>
						<main className='all-cards'>
							{pokeCards.map((poke) => {
								return <PokemonCard pokemon={poke} key={poke.url} />;
							})}
						</main>
					</div>
				))}
		</>
	);
};

export default Home;
