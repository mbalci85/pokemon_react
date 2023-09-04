import React, { useEffect, useState, useContext } from 'react';
import './Favorites.css';
import axios from 'axios';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { ThemeContext } from '../../contexts/ThemeContext';
const Favorites = ({ favPokes, setFavPokes }) => {
	const [favPokeCards, setFavPokeCards] = useState([]);
	const { darkMode, darkModeStyle } = useContext(ThemeContext);

	useEffect(() => {
		Promise.all(
			favPokes.map(async (id) => {
				try {
					const response = await axios.get(
						`https://pokeapi.co/api/v2/pokemon/${id}`
					);
					return response.data;
				} catch (error) {
					if (error.response && error.response.status === 404)
						console.log(error);
				}
			})
		)
			.then((favItems) => setFavPokeCards(favItems))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className={`favorites-body ${darkMode ? 'dark-mode' : ''}`}>
			{favPokeCards.map((pokemon) => {
				return (
					<div key={pokemon.id}>
						<PokemonCard
							pokemon={pokemon}
							favPokes={favPokes}
							setFavPokes={setFavPokes}
							favPokeCards={favPokeCards}
							setFavPokeCards={setFavPokeCards}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Favorites;
