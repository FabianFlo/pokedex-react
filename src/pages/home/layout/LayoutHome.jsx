import React, { useState } from "react";
import css from "./Layout.module.scss";
import Header from "../header/Header";
import Pokedex from "../pokedex/Pokedex";

export default function LayoutHome() {
  const [searchResult, setSearchResult] = useState(null);

  const handlePokemonFound = (pokemon) => {
    setSearchResult(pokemon); // Actualizamos el resultado en el estado
  };

  const handleClearSearch = () => {
    setSearchResult(null); // Limpiamos el resultado de la búsqueda
  };

  return (
    <div className={css.layout}>
      <Header onPokemonFound={handlePokemonFound} />
      <Pokedex searchResult={searchResult} onClearSearch={handleClearSearch} />
    </div>
  );
}
