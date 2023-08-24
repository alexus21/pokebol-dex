import {cardCreator} from "./cardCreator.js";
import {getSpecies, getHeight, getWeight, getType, getAbilities, getStats, getMoves} from "./getPokemonGeneralInfo.js";

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
        // console.log(names);
        cardCreator(names);
        showPokemonInfo(names);
    })
    .then(pokemonData => {
        console.log(pokemonData); // Imprimir información del primer Pokémon
    })
    .catch(error => console.log("Error: ", error));


const showPokemonInfo = (pokeData) => {
    const pokemon = pokeData[7];

    getSpecies(pokemon)
        .then(data => console.log("Especie: ", data.species.name))
        .catch(error => console.error("Error al obtener la especie:", error));

    getHeight(pokemon)
        .then(data => console.log("Altura: ", data.height*10, "cm"))
        .catch(error => console.error("Error al obtener la especie:", error));

    getWeight(pokemon)
        .then(data => console.log("Peso: ", data.weight, "lb"))
        .catch(error => console.error("Error al obtener la especie:", error));

    getType(pokemon)
        .then(data => console.log("Tipo: ", data.types[0].type.name))
        .catch(error => console.error("Error al obtener la especie:", error));

    // getAbilities(pokemon)
    //     .then(data => console.log("Habilidades: ", data.abilities[0].ability.name, ", ", data.abilities[1].ability.name, ))
    //     .catch(error => console.error("Error al obtener la especie:", error));

    getAbilities(pokemon)
        .then(data => {
            console.log("Habilidades: ");
            data.abilities.forEach(ability => {
                console.log("\t", ability.ability.name);
            });
        })
        .catch(error => console.error("Error al obtener la especie:", error));

    getStats(pokemon)
        .then(data => {
            console.log("Stats:");
            data.stats.forEach(stat => {
                console.log("\t", stat.stat.name, ": ", stat.base_stat);
            });
        })
        .catch(error => console.error("Error al obtener las estadísticas:", error));

    getMoves(pokemon)
            .then(data => {
                console.log("Moves:");
                data.moves.forEach(move => {
                    console.log("\t", move.move.name);
                });
            })
            .catch(error => console.error("Error al obtener las estadísticas:", error));
};
