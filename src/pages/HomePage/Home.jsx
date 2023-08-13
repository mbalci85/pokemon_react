import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const Home = () => {
	const [pokeCards, setPokeCards] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [id, setId] = useState(0);
	const location = useLocation(); // When click Home link, it resets page

	const fetchPokemons = async (searchValue) => {
		const url = searchValue
			? `https://pokeapi.co/api/v2/pokemon/${searchValue}`
			: 'https://pokeapi.co/api/v2/pokemon/';
		try {
			const response = await axios.get(url);
			setPokeCards(searchValue ? [response.data] : response.data.results);
			setId(searchValue ? response.data.id : '');
		} catch (error) {
			if (error.response.status === 404) {
				setPokeCards([]);
			}
		}
	};

	useEffect(() => {
		fetchPokemons();
		setPokeCards([]);
		setUserInput('');
	}, [location]);

	const search = (e) => {
		e.preventDefault();
		fetchPokemons(userInput);
	};

	const prevPoke = () => {
		if (id - 1 !== 0) {
			fetchPokemons(id - 1);
		}
	};

	const nextPoke = () => {
		if (id + 1 !== 1011) {
			fetchPokemons(id + 1);
		}
	};

	return (
		<>
			{pokeCards && (
				<div className='all-cards-container'>
					<h1>POKEMONS</h1>
					<form onSubmit={search} className='search-form'>
						<input
							type='text'
							placeholder='Search by Name or ID (1-1010)'
							value={userInput}
							onChange={(e) => {
								setUserInput(e.target.value);
							}}
							className='search-input'
						/>
						<button type='submit' className='search-submit-btn'>
							Search
						</button>
					</form>
					{pokeCards.length === 1 ? (
						<div className='search-container'>
							<div className='prev-btn'>
								<button onClick={prevPoke}>Previous</button>
							</div>
							<div className='search-result-container'>
								<img
									src={
										pokeCards[0].sprites.other.home.front_shiny ||
										pokeCards[0].sprites.front_default
									}
									alt={`${pokeCards[0].name}_img`}
								/>
								<p className='detail-item'>ID: {pokeCards[0].id}</p>
								<p className='detail-item'>
									Height: {pokeCards[0].height}
								</p>
								<p className='detail-item'>
									Weight: {pokeCards[0].weight}
								</p>
								<p className='detail-item'>
									Species: {pokeCards[0].species.name}
								</p>
								<p className='detail-item'>
									Abilities:{' '}
									{pokeCards[0].abilities
										.map((item) => item.ability.name)
										.join(', ')}
								</p>
							</div>
							<div className='next-btn'>
								<button onClick={nextPoke}>Next</button>
							</div>
						</div>
					) : (
						<main className='all-cards'>
							{pokeCards.map((poke) => {
								return <PokemonCard pokemon={poke} key={poke.url} />;
							})}
						</main>
					)}
				</div>
			)}
		</>
	);
};

export default Home;
