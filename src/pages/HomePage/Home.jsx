import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const Home = () => {
	const [pokeCards, setPokeCards] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [id, setId] = useState(0);
	const [nextUrl, setNextUrl] = useState('');
	const [prevUrl, setPrevUrl] = useState('');
	const [changePage, setChangePage] = useState('');
	const location = useLocation(); // When click Home link, it resets page

	const fetchPokemons = async (searchValue = '', change) => {
		const url = searchValue !== ''
			? `https://pokeapi.co/api/v2/pokemon/${searchValue}`
			: changePage === 'Next'
			? nextUrl
			: changePage === 'Previous'
			? prevUrl
			: 'https://pokeapi.co/api/v2/pokemon/?limit=40';
		try {
			const response = await axios.get(url);
			setPokeCards(searchValue ? [response.data] : response.data.results);
			setId(searchValue ? response.data.id : '');
			setNextUrl(response.data.next);
			setPrevUrl(response.data.previous);
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
		console.log(nextUrl);
		console.log(prevUrl);
	}, [location, changePage]);

	const search = (e) => {
		e.preventDefault();
		if (userInput) {
			fetchPokemons(userInput.toLowerCase());
		}
	};

	const prevPoke = () => {
		if (id - 1 !== 0) {
			fetchPokemons(id - 1);
			setUserInput('');
		} else {
			fetchPokemons(1010);
		}
	};

	const nextPoke = () => {
		if (id + 1 !== 1011) {
			fetchPokemons(id + 1);
			setUserInput('');
		} else {
			fetchPokemons(1);
		}
	};

	return (
		<>
			{pokeCards && (
				<div className='all-cards-container'>
					<h1>POKEMONS</h1>
					<div className='search-pagination-container'>
						<button
							onClick={() => {
								setChangePage('Previous');
								fetchPokemons();
							}}>
							Previous Page
						</button>
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
						<button
							onClick={() => {
								setChangePage('Next');
								fetchPokemons();
							}}>
							Next Page
						</button>
					</div>
					{pokeCards.length === 1 ? (
						<div className='search-result-container'>
							<div className='next-prev-btn-container'>
								<button onClick={prevPoke} className='prev-btn'>
									&larr; Previous
								</button>
							</div>
							<div className='filtered-char-container'>
								<img
									src={
										pokeCards[0].sprites.other.home.front_shiny ||
										pokeCards[0].sprites.front_default
									}
									alt={`${pokeCards[0].name}_img`}
								/>
								<p className='search-result-info'>
									ID: {pokeCards[0].id}
								</p>
								<p className='search-result-info'>
									{pokeCards[0].name.charAt(0).toUpperCase() +
										pokeCards[0].name.slice(1)}
								</p>
								<Link to={`/detail/${id}`}>See Details</Link>
							</div>
							<div className='next-prev-btn-container'>
								<button onClick={nextPoke} className='next-btn'>
									Next &rarr;
								</button>
							</div>
						</div>
					) : pokeCards.length === 0 ? (
						<div className='no-result-msg-container'>
							<p className='no-result-msg'>There is no such Pokemon!!!!</p>
							<p>Click Home or search another Pokemon :)</p>
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
