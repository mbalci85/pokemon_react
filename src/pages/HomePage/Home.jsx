import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';

const Home = ({ display, setDisplay, offset, setOffset }) => {
	const [pokeCards, setPokeCards] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [id, setId] = useState(0);
	const [charCount, setCharCount] = useState(1281);
	const [pageCount, setPageCount] = useState('');
	const [inputPageNum, setInputPageNum] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const location = useLocation(); // When click Home link, it resets page

	const navigate = useNavigate();

	const handlePageChange = (pageNum = 1) => {
		if (pageNum > 0 && pageNum <= Math.ceil(charCount / limit)) {
			navigate(`?page=${pageNum}`);
			setIsLoading(true);
		} else {
			navigate('/');
		}
	};

	let limit = 30;

	const fetchPokemons = async (searchValue) => {
		setIsLoading(true);
		const url = searchValue
			? `https://pokeapi.co/api/v2/pokemon/${searchValue}`
			: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
		try {
			const response = await axios.get(url);
			setPokeCards(searchValue ? [response.data] : response.data.results);

			setId(searchValue ? response.data.id : '');
			if (response.data.count) {
				setCharCount(response.data.count);
				setPageCount(Math.ceil(charCount / limit));
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				setPokeCards([]);
			}
		} finally {
			setIsLoading(false);
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
		}
	};

	const nextPoke = () => {
		if (id + 1 !== 1011 || id + 1 !== 10272) {
			fetchPokemons(id + 1);
			setUserInput('');
		}
	};

	const goToPage = (e) => {
		e.preventDefault();

		if (inputPageNum >= 1 && inputPageNum <= pageCount) {
			setOffset(limit * (inputPageNum - 1));
			handlePageChange(inputPageNum);
		}
	};

	return isLoading ? (
		<div className='loading'>
			<ThreeDots stroke='#98ff98' strokeOpacity={0.125} speed={0.75} />
		</div>
	) : (
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
							{'<'} Page{' '}
							{offset / limit !== 0 && offset / limit < pageCount
								? offset / limit
								: null}
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
							<button
								type='submit'
								className='search-submit-btn'
								disabled={!userInput}>
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
							Page{' '}
							{offset / limit < pageCount - 1 ? offset / limit + 2 : null}{' '}
							{'>'}
						</button>
					</div>

					<div
						className={
							display ? 'go-to-page-form-container' : 'display-none'
						}>
						<form onSubmit={goToPage}>
							<button
								type='submit'
								className='go-to-page-btn'
								disabled={!inputPageNum}>
								Go to Page
							</button>
							<input
								type='text'
								placeholder={`Up to ${pageCount}`}
								className='go-to-page-input'
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
											pokeCards[0].sprites.other['official-artwork']
												.front_default ||
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
