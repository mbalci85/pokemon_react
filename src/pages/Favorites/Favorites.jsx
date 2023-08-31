import React, { useEffect, useState } from 'react';
import './Favorites.css';
import axios from 'axios';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
const Favorites = ({ favPokes, setFavPokes }) => {
	const [favPokeCards, setFavPokeCards] = useState([]);

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
		<div className='favorites-body'>
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
