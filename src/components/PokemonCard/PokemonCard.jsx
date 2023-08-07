import React, { useState, useEffect } from 'react';
import './PokemonCard.css';
import axios from 'axios';

const PokemonCard = ({ pokemon }) => {
	const [card, setCard] = useState('');

	useEffect(() => {
		axios
			.get(pokemon.url)
			.then((res) => {
				console.log(res.data);
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
				</div>
			)}
		</>
	);
};

export default PokemonCard;
