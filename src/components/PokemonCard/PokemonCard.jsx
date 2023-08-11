import React, { useState, useEffect } from 'react';
import './PokemonCard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
	const [card, setCard] = useState('');

	useEffect(() => {
		axios
			.get(pokemon.url)
			.then((res) => {
				setCard(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{card && (
				<div className='pokemon-card'>
					<img src={card.sprites.other.home.front_shiny} alt='poke_img' />
					<p>{pokemon.name}</p>
					<Link to={`/detail/${card.id}`}>
						<button>See Details</button>
					</Link>
				</div>
			)}
		</>
	);
};

export default PokemonCard;
