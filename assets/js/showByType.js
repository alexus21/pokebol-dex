// Importar la función getTypeColor desde otro archivo
import { getTypeColor } from "./cardCreator.js";
import {getType} from "./getPokemonGeneralInfo.js";

// Array para llevar un registro de los tipos ya creados
const createdTypes = [];

/**
 * Crea y muestra un botón para un tipo de Pokémon si no se ha creado previamente.
 * @param {string} pokemonType - El tipo de Pokémon a presentar.
 */
export const presentByTypes = (pokemonType) => {
    const pokemonListByType = document.querySelector(".pokemonListByType");

    // Verificar si el tipo de Pokémon ya ha sido creado
    if (createdTypes.indexOf(pokemonType) === -1) {
        const button = document.createElement("button");
        button.style.color = "black";
        button.style.background = getTypeColor(pokemonType);
        button.classList.add("mb-3", "rounded-3", "w-100", "fs-4", "buttonPokeList");
        button.textContent = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);

        const hr = document.createElement("hr");
        hr.classList.add("dropdown-divider");

        pokemonListByType.appendChild(button);
        createdTypes.push(pokemonType); // Agregar el tipo a los tipos creados
    }

    getPressedValue();
};

/**
 * Muestra los detalles al hacer clic en un botón de tipo de Pokémon.
 */
const getPressedValue = () => {
    document.querySelectorAll(".buttonPokeList").forEach(button => {
        button.addEventListener("click", function () {
            console.log(button.textContent);
        });
    });
};

const getSelectedTypesFromDom = (type) => {
    const speciesArray = document.querySelectorAll(".species-type")
    speciesArray.forEach(pokemonType => {
        console.log(pokemonType.textContent);
        return;
    });
};
