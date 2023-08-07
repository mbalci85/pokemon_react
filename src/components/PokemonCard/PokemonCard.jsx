import React, { useState, useEffect } from 'react';
import './PokemonCard.css';
import axios from 'axios';

const PokemonCard = ({ pokemon }) => {
	const pokeUrl = pokemon.url;
	const [card, setCard] = useState('');

	useEffect(() => {
		axios
			.get(pokeUrl)
			.then((res) => {
				console.log(res.data);
				setCard(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{card && (
				<div>
					<img src={card.sprites.other.home.front_shiny} alt='poke_img' />
				</div>
			)}
		</>
	);
};

export default PokemonCard;
