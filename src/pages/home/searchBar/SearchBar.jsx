import React, { useState } from "react";
import axios from "axios";
import css from "./SearchBar.module.scss";

const SearchBar = ({ onPokemonFound }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setError(null);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      onPokemonFound(response.data); // Llama a la función para manejar el resultado
    } catch (err) {
      setError("No se encontró el Pokémon. Verifica el nombre o número.");
    }
  };

  return (
    <div className={css.searchBar}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre o número..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Buscar
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default SearchBar;
