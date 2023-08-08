import React, { useEffect, useState } from 'react';
import './Detail.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
	const { pokemonId } = useParams();
	const detailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
	const [pokeCard, setPokeCard] = useState('');

	useEffect(() => {
		axios
			.get(detailUrl)
			.then((res) => {
				console.log(res.data);
				setPokeCard(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{pokeCard && (
				<div className='detail-container'>
					<img
						src={pokeCard.sprites.other.home.front_shiny}
						alt={`${pokeCard.name}_img`}
					/>
					<p className='detail-item-name'>{pokeCard.name}</p>
					<div className='detail-item-container'>
						<p className='detail-item'>Height: {pokeCard.height}</p>
						<p className='detail-item'>Weight: {pokeCard.weight}</p>
						<p className='detail-item'>Species: {pokeCard.species.name}</p>
						<p className='detail-item'>
							Abilities:{' '}
							{pokeCard.abilities
								.map((item) => item.ability.name)
								.join(', ')}
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Detail;
