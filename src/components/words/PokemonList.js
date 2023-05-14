import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pokemonList.css";


function PokemonList({ onPokemonSelected }) {
  const [kantoPokemon, setKantoPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);




  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://pokebuildapi.fr/api/v1/pokemon/limit/151"
      );
      // verifie si la reponse est ok
      if (response.status === 200) {
        const kantoPokemonNames = response.data.map((pokemon) => {
          return {
            name: pokemon.slug,
            imageUrl: pokemon.image,
          };
        });
        setKantoPokemon(kantoPokemonNames);

      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      // convert to uppercase
      document.querySelector('.button').style.display = 'none';
      const pokemonName = selectedPokemon.name.toUpperCase();
      onPokemonSelected(pokemonName);
    }
  }, [selectedPokemon, onPokemonSelected]);


  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * kantoPokemon.length);
    setSelectedPokemon(kantoPokemon[randomIndex]);

  };


  return (
    <div>
      <button className="button" onClick={handleButtonClick}>
        Commencer une partie
      </button>
      <div className="pokemon">
        {selectedPokemon && (
          <div className="infos">
            <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} />

          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonList;

