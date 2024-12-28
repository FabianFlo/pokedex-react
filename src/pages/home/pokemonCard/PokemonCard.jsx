import React from "react";
import css from "./PokemonCard.module.scss";

// Colores de tipos de Pokémon
const typeColors = {
  fire: "#f37441",
  water: "#87CEFA",
  grass: "#4dcc6e",
  electric: "#eed535",
  ice: "#8de0eacf",
  ground: "#DEB887",
  rock: "#a7a2a2",
  fairy: "#FFB6C1",
  poison: "#964aac",
  bug: "#98FB98",
  dragon: "#F4A460",
  psychic: "#FFB5E8",
  flying: "#D8BFD8",
  fighting: "#be6e47",
  normal: "#a9a9a99e",
  ghost: "#C3B1E1",
  steel: "#DCDCDC",
  dark: "#A9A9A9",
};

// Colores de los botones de tipo
const typeButtonColors = {
  fire: "#FF6347",
  water: "#4682B4",
  grass: "#32CD32",
  electric: "#FFD700",
  ice: "#5F9EA0",
  ground: "#8B4513",
  rock: "#708090",
  fairy: "#FF69B4",
  poison: "#8A2BE2",
  bug: "#6B8E23",
  dragon: "#BC8F8F",
  psychic: "#DB7093",
  flying: "#87CEEB",
  fighting: "#CD5C5C",
  normal: "#B0C4DE",
  ghost: "#483D8B",
  steel: "#B0B0B0",
  dark: "#696969",
};

// Función para formatear el número del Pokémon a tres dígitos
const formatPokemonNumber = (number) => {
    return `#${String(number).padStart(3, "0")}`;
  };
  
  const PokemonCard = ({ pokemon }) => {
    const primaryType = pokemon.types[0]?.type.name;
    const backgroundColor = typeColors[primaryType] || "#FFFFFF";
  
    return (
      <div
        className={css.card}
        style={{
          backgroundColor: backgroundColor,  // Fondo color sólido
        }}
      >
        {/* Número de Pokémon con ceros a la izquierda */}
        <div className={css.pokemonNumber}>{formatPokemonNumber(pokemon.id)}</div>
  
        {/* Imagen del Pokémon */}
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className={css.pokemonImage}
        />
        <h3 className={css.pokemonName}>{pokemon.name.toUpperCase()}</h3>
  
        {/* Botones de tipos */}
        <div className={css.typeButtons}>
          {pokemon.types.map((type) => (
            <button
              key={type.type.name}
              className={css.typeButton}
              style={{ backgroundColor: typeButtonColors[type.type.name] }}
            >
              {type.type.name}
            </button>
          ))}
        </div>
  
        {/* Estadísticas del Pokémon */}
        <div className={css.stats}>
          <h4>Stats:</h4>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className={css.statRow}>
                <span className={css.statName}>{stat.stat.name}:</span>
                <div className={css.statBar}>
                  <div
                    className={css.statFill}
                    style={{
                      width: `${(stat.base_stat / 255) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className={css.statValue}>{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default PokemonCard;