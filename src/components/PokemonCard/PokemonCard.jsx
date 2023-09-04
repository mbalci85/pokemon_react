import React, { useState, useEffect } from 'react';
import './PokemonCard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFaceGrinHearts, FaFaceRollingEyes } from 'react-icons/fa6';

const PokemonCard = ({
	pokemon,
	favPokes,
	setFavPokes,
	favPokeCards,
	setFavPokeCards,
}) => {
	const [card, setCard] = useState('');

	useEffect(() => {
		if (pokemon.url) {
			axios
				.get(pokemon.url)
				.then((res) => {
					setCard(res.data);
				})
				.catch((err) => console.error(err));
		} else {
			setCard(pokemon);
		}
	}, []);

	const handleFavorites = () => {
		if (favPokes.includes(card.id)) {
			const filteredFavorites = favPokes.filter((id) => id !== card.id);
			setFavPokes(filteredFavorites);
			localStorage.setItem('fav-pokes', JSON.stringify(filteredFavorites));
			setFavPokeCards(favPokeCards.filter((poke) => poke.id !== card.id));
		} else {
			const newFavPokes = [...favPokes, card.id];
			setFavPokes(newFavPokes);
			localStorage.setItem('fav-pokes', JSON.stringify(newFavPokes));
		}
	};

	return (
		<>
			{card && (
				<div className='pokemon-card'>
					<img
						src={
							card.sprites.other.home.front_shiny ||
							card.sprites.other['official-artwork'].front_default ||
							card.sprites.front_default
						}
						alt='poke_img'
					/>
					<p>{pokemon.name}</p>
					<Link to={`/detail/${card.id}`}>
						<button>See Details</button>
					</Link>
					{favPokes.includes(card.id) && (
						<FaFaceGrinHearts
							className='remove-from-fav-icon'
							title='Remove from Favorites'
							onClick={handleFavorites}
						/>
					)}
					{favPokes.includes(card.id) && (
						<FaFaceRollingEyes
							className='display-none'
							title='Add to Favorites'
							onClick={handleFavorites}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default PokemonCard;
