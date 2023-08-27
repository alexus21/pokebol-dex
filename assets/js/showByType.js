// Lleva un registro de los tipos ya creados
import {getTypeColor} from "./cardCreator.js";

const createdTypes = [];

export const presentByTypes = (pokemonType) => {
    const pokemonListByType = document.querySelector(".dropdown-menu");

    if (createdTypes.indexOf(pokemonType) === -1) {

        const li = document.createElement("li");
        li.textContent = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
        li.style.color = "black";
        li.style.background = getTypeColor(pokemonType);
        li.classList.add("mb-3", "rounded-4");

        const button = document.createElement("button");
        button.classList.add("dropdown-item");

        const hr = document.createElement("hr");
        hr.classList.add("dropdown-divider");

        li.appendChild(button);
        // li.appendChild(hr);

        pokemonListByType.appendChild(li);

        createdTypes.push(pokemonType); // Agregar el tipo a los tipos creados

        console.log(pokemonType);
    }
};


