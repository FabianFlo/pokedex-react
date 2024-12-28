import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../pokemonCard/PokemonCard";
import css from "./Pokedex.module.scss";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const Pokedex = ({ searchResult, onClearSearch }) => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1); // Página actual (empezamos en la 1)
  const [loading, setLoading] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(0); // Guardar el total de pokemons

  const pokemonsPerPage = 20;
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage); // Calcular el número de páginas dinámicamente

  const fetchTotalPokemons = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      const totalCount = response.data.count; // Total de Pokémon disponible
      setTotalPokemons(totalCount);
    } catch (error) {
      console.error("Error fetching total Pokémon count", error);
    }
  };

  const fetchPokemons = async (currentPage) => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * pokemonsPerPage;
      const response = await axios.get(`${API_URL}?limit=${pokemonsPerPage}&offset=${offset}`);
      const results = response.data.results;

      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setPokemons(pokemonDetails);
    } catch (error) {
      console.error("Error fetching Pokémon data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTotalPokemons(); // Obtener el total de Pokémon al cargar el componente
  }, []);

  useEffect(() => {
    if (!searchResult) {
      fetchPokemons(page); // Cargar los Pokémon de la página actual
    }
  }, [page, searchResult]);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className={css.pokedex}>
      <h1 className={css.title}>Pokédex</h1>

      {/* Mostrar solo si no hay búsqueda activa */}
      {!searchResult && (
        <div className={css.pagination}>
          <button
            onClick={handlePreviousPage}
            className={`${css.pageButton} ${page === 1 ? css.disabled : ""}`}
          >
            &lt;
          </button>
          <span className={css.pageInfo}>
            <strong>{page}</strong> de <strong>{totalPages}</strong>
          </span>
          <button
            onClick={handleNextPage}
            className={`${css.pageButton} ${page === totalPages ? css.disabled : ""}`}
          >
            &gt;
          </button>
        </div>
      )}


      {/* Cargar o mostrar el resultado */}
      {loading && <p>Cargando Pokémon...</p>}
      <div className={css.pokemonList}>
        {searchResult ? (
          <PokemonCard pokemon={searchResult} />
        ) : (
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>

      {/* Botón para limpiar la búsqueda */}
      {searchResult && (
        <button className={css.clearSearchButton} onClick={onClearSearch}>
          Mostrar todos los Pokémon
        </button>
      )}
    </div>
  );
};

export default Pokedex;
