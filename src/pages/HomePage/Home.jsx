import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const Home = ({ display, setDisplay }) => {
	const [pokeCards, setPokeCards] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [id, setId] = useState(0);
	const [offset, setOffset] = useState(0);
	const [charCount, setCharCount] = useState(1281);
	const [pageCount, setPageCount] = useState('');
	const [inputPageNum, setInputPageNum] = useState('');

	const location = useLocation(); // When click Home link, it resets page

	const navigate = useNavigate();

	const handlePageChange = (pageNum = 1) => {
		if (pageNum > 0 && pageNum <= Math.ceil(charCount / limit)) {
			navigate(`?page=${pageNum}`);
		} else {
			navigate('/');
		}
	};

	let limit = 40;

	const fetchPokemons = async (searchValue) => {
		const url = searchValue
			? `https://pokeapi.co/api/v2/pokemon/${searchValue}`
			: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
		try {
			const response = await axios.get(url);
			setPokeCards(searchValue ? [response.data] : response.data.results);
			setId(searchValue ? response.data.id : '');
			if (response.data.count) {
				setCharCount(response.data.count);
				setPageCount(Math.ceil(charCount / limit) - 1);
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				setPokeCards([]);
			}
		}
	};

	useEffect(() => {
		fetchPokemons();
		setPokeCards([]);
		setUserInput('');
	}, [location, offset]);

	const search = (e) => {
		e.preventDefault();
		if (userInput) {
			fetchPokemons(userInput.toLowerCase());
			setInputPageNum('');
			setDisplay(false);
		}
	};

	const prevPoke = () => {
		if (id - 1 !== 0 || id - 1 !== 10000) {
			fetchPokemons(id - 1);
			setUserInput('');
			console.log(pageCount);
			console.log(charCount);
		}
	};

	const nextPoke = () => {
		if (id + 1 !== 1011 || id + 1 !== 10272) {
			fetchPokemons(id + 1);
			setUserInput('');
			console.log(pageCount);
			console.log(charCount);
		}
	};

	const goToPage = (e) => {
		e.preventDefault();

		if (inputPageNum >= 1 && inputPageNum <= pageCount) {
			setOffset(limit * (inputPageNum - 1));
			handlePageChange(inputPageNum);
		}
	};

	return (
		<>
			{pokeCards && (
				<div className='all-cards-container'>
					<h1>POKEMONS</h1>
					<div className='search-pagination-container'>
						<button
							className={display ? 'prev-page-btn' : 'display-none'}
							onClick={() => {
								if (offset !== 0) {
									setOffset(offset - limit);
									handlePageChange(offset / limit);
									setInputPageNum('');
								}
							}}>
							{'<'} Previous Page
						</button>
						<form onSubmit={search} className='search-form'>
							<input
								type='text'
								placeholder='Search by Name or ID (1-1010 or 10001-10271)'
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
							className={display ? 'next-page-btn' : 'display-none'}
							onClick={() => {
								if (!(offset + limit > 10271)) {
									setOffset(offset + limit);
									handlePageChange(offset / limit + 2);
									setInputPageNum('');
								}
							}}>
							Next Page {'>'}
						</button>
					</div>

					<div
						className={
							display ? 'go-to-page-form-container' : 'display-none'
						}>
						<form onSubmit={goToPage}>
							<button type='submit'>Go to Page</button>
							<input
								type='text'
								placeholder={`Up to ${pageCount}`}
								value={inputPageNum}
								onChange={(e) => setInputPageNum(e.target.value)}
							/>
						</form>
					</div>
					{pokeCards.length === 1 ? (
						<div className='search-result-container'>
							<div className='next-prev-btn-container'>
								<button onClick={prevPoke} className='prev-btn'>
									&larr; Previous Poke
								</button>
							</div>
							<div className='filtered-char-container'>
								<img
									src={
										pokeCards[0].sprites &&
										(pokeCards[0].sprites.other.home.front_shiny ||
											pokeCards[0].sprites.front_default)
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
									Next Poke &rarr;
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
