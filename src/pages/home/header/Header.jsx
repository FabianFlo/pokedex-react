import React, { useState, useEffect } from "react";
import css from "./header.module.scss";
import logo from "../../../assets/pokemon.png";
import axios from "axios";

export default function Header({ onPokemonFound }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  // Cargar la lista de Pokémon
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        setPokemonList(
          response.data.results.map((pokemon) => pokemon.name)
        );
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Por favor, ingresa un nombre o número.");
      return;
    }

    const sanitizedQuery = query.toLowerCase().trim(); // Convertimos a minúsculas y eliminamos espacios.
    setError(null);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${sanitizedQuery}`
      );
      onPokemonFound(response.data);
    } catch (err) {
      setError("No se encontró el Pokémon. Verifica el nombre o número.");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setSuggestions(
      pokemonList.filter((name) => name.startsWith(value)).slice(0, 5) // Mostrar máximo 5 sugerencias
    );
  };

  const handleLogoClick = () => {
    window.location.reload(); // Recarga la página
  };

  return (
    <nav className={css.header}>
      <br />
      <div className={css.div_header}>
        <div className={css.div_logo}>
          {/* Logo como botón para recargar la página */}
          <button onClick={handleLogoClick} className={css.logoButton}>
            <img src={logo} alt="logo" />
          </button>
        </div>
        <div className={css.div_search}>
          <form onSubmit={handleSearch} className={css.searchForm}>
            <input
              type="search"
              placeholder="Buscar Pokémon por nombre o número..."
              value={query}
              onChange={handleInputChange}
              className={css.searchInput}
            />
            <button type="submit" className={css.searchButton}>
              Buscar
            </button>
          </form>
          <ul className={`${css.suggestions} ${suggestions.length > 0 ? css.visible : ""}`}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]); // Limpiar sugerencias al seleccionar
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
          {error && <p className={css.error}>{error}</p>}
        </div>
      </div>
      <br />
    </nav>
  );
}
