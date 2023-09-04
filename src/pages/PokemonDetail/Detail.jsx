import React, { useEffect, useState, useContext } from 'react';
import './Detail.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
const Detail = () => {
	const { pokemonId } = useParams();
	const detailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
	const [pokeCard, setPokeCard] = useState('');

	const { darkMode } = useContext(ThemeContext);

	useEffect(() => {
		const fetchDetail = async () => {
			try {
				const response = await axios.get(detailUrl);
				setPokeCard(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchDetail();
	}, []);

	return (
		<>
			{pokeCard && (
				<div className={`detail-container ${darkMode ? 'dark-mode' : ''}`}>
					<img
						src={
							pokeCard.sprites.other.home.front_shiny ||
							pokeCard.sprites.other['official-artwork'].front_default ||
							pokeCard.sprites.front_default
						}
						alt={`${pokeCard.name}_img`}
					/>
					<p className='detail-item-name'>
						{pokeCard.name.charAt(0).toUpperCase() + pokeCard.name.slice(1)}
					</p>
					<div className='detail-item-container'>
						<p className='detail-item'>ID: {pokeCard.id}</p>
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
