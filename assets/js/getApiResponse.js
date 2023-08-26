import { cardCreator } from "./cardCreator.js";
// Importar todo de golpe y darle un nombre:
import * as pokemonInfo from "./getPokemonGeneralInfo.js";

// Obtiene la lista de los primeros 150 Pokémon.
function getPokemonList() {
    const pokemonNumber = 150;

    return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta a JSON y retornar los datos
            } else {
                throw new Error("Error al procesar datos: " + response.status);
            }
        });
}

// Obtener información de los primeros 150 Pokémon.
getPokemonList()
    .then(data => {
        const names = data.results.map(pokemon => pokemon.name);
        cardCreator(names); // Crear y mostrar tarjetas de Pokémon
        // showPokemonInfo(names);
        console.log("Data collected");
        return names; // Pasar los nombres de los Pokémon al siguiente then
    })
    .then(pokeData => {
        console.log("Data collected");
        // showPokemonInfo(pokeData); // Mostrar información detallada de un Pokémon
    })
    .catch(error => console.log("Error: ", error));

// Muestra información de un Pokémon.
const showPokemonInfo = (pokeData) => {
    const pokemon = pokeData[7]; // Cambiar el índice para mostrar información de otro Pokémon

    pokemonInfo.getSpecies(pokemon)
        .then(data => console.log("Especie: ", data.species.name))
        .catch(error => console.error("Error al obtener la especie:", error));

    pokemonInfo.getHeight(pokemon)
        .then(data => console.log("Altura: ", data.height * 10, "cm"))
        .catch(error => console.error("Error al obtener la altura:", error));

    pokemonInfo.getWeight(pokemon)
        .then(data => console.log("Peso: ", data.weight, "lb"))
        .catch(error => console.error("Error al obtener el peso:", error));

    pokemonInfo.getType(pokemon)
        .then(data => console.log("Tipo: ", data.types[0].type.name))
        .catch(error => console.error("Error al obtener el tipo:", error));

    pokemonInfo.getAbilities(pokemon)
        .then(data => {
            console.log("Habilidades: ");
            data.abilities.forEach(ability => {
                console.log("\t", ability.ability.name);
            });
        })
        .catch(error => console.error("Error al obtener las habilidades:", error));

    pokemonInfo.getStats(pokemon)
        .then(data => {
            console.log("Stats:");
            data.stats.forEach(stat => {
                console.log("\t", stat.stat.name, ": ", stat.base_stat);
            });
        })
        .catch(error => console.error("Error al obtener las estadísticas:", error));

    pokemonInfo.getMoves(pokemon)
        .then(data => {
            console.log("Moves:");
            data.moves.forEach(move => {
                console.log("\t", move.move.name);
            });
        })
        .catch(error => console.error("Error al obtener los movimientos:", error));
};
