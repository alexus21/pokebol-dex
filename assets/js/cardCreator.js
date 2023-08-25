import { getType } from "./getPokemonGeneralInfo.js";

//Función encargada de crear una card para cada Pokémon
export const cardCreator = (pokeData) => {
    const main = document.querySelector("main");

    pokeData.forEach((pokemon, index) => {
        // Crear una nueva sección para la tarjeta de Pokémon.
        const mySection = document.createElement("section");
        mySection.classList.add("card", "poke-card", "m-1");
        mySection.setAttribute("id", `infoModal-${index}`);

        // Crear un artículo para el contenido de la tarjeta.
        const myArticle = document.createElement("article");
        myArticle.classList.add("card-body");

        // Crear un encabezado h5 para el nombre del Pokémon.
        const myH5 = document.createElement("h5");
        myH5.classList.add("card-title");
        // Agregando inicial mayúscula al nombre del Pokémon:
        myH5.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);

        // Crear un botón para ver más detalles del Pokémon.
        const myButton = document.createElement("button");
        myButton.classList.add("btn", "btn-primary", "ms-3");
        myButton.setAttribute("data-bs-toggle", "modal"); // Atributo de Bootstrap para activar el modal
        myButton.setAttribute("data-bs-target", "#modalInfo"); // ID del modal
        myButton.addEventListener("click", function () {
            showPokemonName(pokemon);
            showPokemonPicture(index);
        });
        myButton.textContent = "Ver detalles";

        // Agregar la imagen del Pokémon.
        const myImg = document.createElement("img");
        myImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`; // Incrementar el índice en 1
        myImg.classList.add("card-img-top");
        myImg.alt = "Imagen de " + pokemon;

        // Obtener el tipo del Pokémon
        getType(pokemon)
        .then(data => {
            const pokemonType = data.types[0].type.name;
            const typeColor = getTypeColor(pokemonType);
            myArticle.style.backgroundColor = typeColor;
        })
        .catch(error => {
            console.error("Error al obtener el tipo:", error);
            // Si ocurre un error, se podría establecer un color por defecto
            myArticle.style.backgroundColor = "#A8A8A8";
        });

        // Agregar los elementos al article.
        myArticle.appendChild(myH5);
        myArticle.appendChild(myImg);
        myArticle.appendChild(myButton);

        // Agregar el artículo al section.
        mySection.appendChild(myArticle);

        // Agregar la sección al main
        main.appendChild(mySection);
    });
};


const getTypeColor = (type) => {
    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
    };
    
    return typeColors[type] || "#A8A8A8"; // Color gris si no es encontrado
}

export const showPokemonName = (pokemon) => {
    const myHeaderArticle = document.querySelector(".modal-header");
    myHeaderArticle.style.backgroundColor = getTypeColor(getType(pokemon));

    // Verificar si ya existe un elemento previo
    const currentItem = myHeaderArticle.querySelector(".modal-title");
    if (currentItem) {
        myHeaderArticle.removeChild(currentItem);
    }

    const myH5 = document.createElement("h5");
    myH5.classList.add("modal-title", "fs-5");
    myH5.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);

    myHeaderArticle.appendChild(myH5);
};

export const showPokemonPicture = (index) => {
    const myBodyArticle = document.querySelector(".modal-body");

    // Verificar si ya existe un elemento previo
    const currentElement = myBodyArticle.querySelector(".modal-picture");
    if (currentElement) {
        myBodyArticle.removeChild(currentElement);
    }

    // Agregar la imagen del Pokémon.
    const myImg = document.createElement("img");
    myImg.classList.add("modal-picture");
    myImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`; // Incrementar el índice en 1
    myImg.classList.add("card-img-top");

    myBodyArticle.appendChild(myImg);
};
