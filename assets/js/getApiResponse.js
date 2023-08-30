import { cardCreator } from "./cardCreator.js";
import * as datos from "./main.js";

// Obtener información de los primeros 150 Pokémon.
datos.Pokemons.getPokemonDetails()
    .then(data => {
        const names = data.results.map(pokemon => pokemon.name);
        cardCreator(names); // Crear y mostrar tarjetas de Pokémon
        // showPokemonInfo(names);
        console.log("Data collected");
        return names; // Pasar los nombres de los Pokémon al siguiente then
    })
    .then(() => {
        console.log("Data collected");
        // showPokemonInfo(pokeData); // Mostrar información detallada de un Pokémon
    })
    .catch(error => console.log("Error: ", error)).catch();
