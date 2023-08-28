// Importar la función getTypeColor, que permite obtener el tipo del Pokémon
import {getTypeColor} from "./cardCreator.js";

// Array para llevar un registro de los tipos ya creados
const createdTypes = [];

/**
 * Crea y muestra un botón para un tipo de Pokémon si no se ha creado previamente.
 */
export const presentByTypes = (pokemonType) => {
    const pokemonListByType = document.querySelector(".pokemonListByType");
    addResetViewButton();

    // Verificar si el tipo de Pokémon ya ha sido creado
    if (createdTypes.indexOf(pokemonType) === -1) {
        // Crear lso botones de los tipos de los pokemon
        const button = document.createElement("button");
        button.style.color = "black";
        button.style.background = getTypeColor(pokemonType);
        button.classList.add("mb-3", "rounded-3", "w-100", "fs-4", "buttonPokeList");
        button.textContent = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);

        // Separador
        const hr = document.createElement("hr");
        hr.classList.add("dropdown-divider");

        pokemonListByType.appendChild(button);
        createdTypes.push(pokemonType); // Agregar el tipo a los tipos creados, para no acumular botones
    }

    // Llamar a la función encargada de obtener el valor del botón presionado
    getPressedValue();
};

// Función para crear botón de resetear vista
const addResetViewButton = () => {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reiniciar vista";
    resetButton.classList.add("mb-3", "rounded-3", "w-100", "fs-4", "resetViewButton", "d-none");
    resetButton.addEventListener("click", resetView);
    document.querySelector(".pokemonListByType").appendChild(resetButton);
}

/**
 * Muestra los detalles al hacer clic en un botón de tipo de Pokémon.
 */
const getPressedValue = () => {
    document.querySelectorAll(".buttonPokeList").forEach(button => {
        button.addEventListener("click", function () {
            filterSpecies(button.textContent);
        });
    })
};

/**
 * Filtra las especies de Pokémon por el tipo seleccionado.
 */
const filterSpecies = (type) => {
    // Función para resetear vista de filtro:
    resetView();

    // Obtener el arreglo de cards:
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const specieList = card.querySelectorAll(".species-type");
        const nSpecies = specieList.length;

        // Recorrer ese arreglo de cards con for para no generar acumulación de datos
        for (let index = 0; index < nSpecies; index++) {
            const specie = specieList[index];
            if (specie.textContent !== type) {
                card.classList.add("d-none");

                // Mostrar el botón de resetear vista post-filtro
                document.querySelector(".resetViewButton").classList.remove("d-none");
                break;
            }
        }
    });
};

/**
 * Restablece la vista mostrando todas las cartas de Pokémon.
 */
export const resetView = () => {
    const cards = document.querySelectorAll(".card");

    // Recorrer el nodo de cards
    cards.forEach(card => {
        card.classList.remove("d-none");
    });

    // Resetear el botón mismo (ocultarlo)
    document.querySelector(".resetViewButton").classList.add("d-none");
};
