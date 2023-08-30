import {presentByTypes} from "./showByType.js";
import * as datos from "./main.js";

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
        myArticle.classList.add("card-body", "rounded");

        // Crear un encabezado h5 para el nombre del Pokémon.
        const myH5 = document.createElement("h5");
        myH5.classList.add("card-title");
        // Agregando inicial mayúscula al nombre del Pokémon:
        myH5.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);

        // Crear un div para mostrar el tipo de especie
        const typePokemonDiv = document.createElement("div");
        typePokemonDiv.classList.add("type-pokemon-div", "text-center", "species-div");

        // Obtener el tipo del Pokémon
        datos.Pokemon.dibujarPokemon(pokemon)
        .then(data => {
            const pokemonType = data.types[0].type.name;
            myArticle.style.backgroundColor = getTypeColor(pokemonType);
            presentByTypes(pokemonType);
        })
        .catch(error => {
            console.error("Error al obtener el tipo:", error);
            // Si ocurre un error, se podría establecer un color por defecto
            myArticle.style.backgroundColor = "#A8A8A8";
        });
        
        // Agregar el tipo de especie debajo del nombre
        const speciesType = document.createElement("p");
        speciesType.classList.add("species-type");
        datos.Pokemon.dibujarPokemon(pokemon)
            .then(data => {
                const pokemonType = data.types[0].type.name;
                speciesType.textContent = `${pokemonType}`.charAt(0).toUpperCase() + pokemonType.slice(1);
            })
            .catch(error => {
                console.error("Error al obtener el tipo:", error);
            });

        // Agregar los elementos al div
        typePokemonDiv.appendChild(speciesType);

        // Agregar los elementos al article.
        myArticle.appendChild(myH5);
        
        // Agregar el div al article
        myArticle.appendChild(typePokemonDiv);

        myArticle.appendChild(createImgItem(index, pokemon));
        myArticle.appendChild(createViewDataButton(index, pokemon));

        // Agregar el artículo al section.
        mySection.appendChild(myArticle);

        // Agregar la sección al main
        main.appendChild(mySection);
    });
};

const createViewDataButton = (index, pokemon) => {
    // Crear un botón para ver más detalles del Pokémon.
    const myButton = document.createElement("button");
    myButton.classList.add("btn", "btn-primary", "ms-5");
    myButton.setAttribute("data-bs-toggle", "modal"); // Atributo de Bootstrap para activar el modal
    myButton.setAttribute("data-bs-target", "#modalInfo"); // ID del modal
    myButton.addEventListener("click", function () {
        // showPokemonName(pokemon);
        showPokemonPicture(index, pokemon);
    });
    myButton.textContent = "Detalles";
    return myButton;
};

const createImgItem = (index, pokemon) => {
    // Agregar la imagen del Pokémon.
    const myImg = document.createElement("img");
    // myImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`; // Incrementar el índice en 1
    myImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`; // Cambiar la URL para obtener el GIF
    myImg.classList.add("card-img-top");
    myImg.alt = "Imagen de " + pokemon;
    return myImg;
};

export const getTypeColor = (type) => {
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

const showPokemonPicture = (index, pokemon) => {
    const myBodyArticle = document.querySelector(".modal-body");
    const myHeaderArticle = document.querySelector(".modal-header"); 
    myBodyArticle.classList.add("d-flex", "flex-column"); // centrar imagen de pokemon

    datos.Pokemon.dibujarPokemon(pokemon)
    .then(data => {
        const myBodyArticle = document.querySelector(".modal-body");
        const pokemonType = data.types[0].type.name;
        const typeColor = getTypeColor(pokemonType);
        myBodyArticle.style.backgroundColor = typeColor;
        myHeaderArticle.style.backgroundColor = typeColor;
    })
    .catch(error => {
        console.error("Error al obtener el tipo:", error);
    });

    // Verificar si ya existen elementos previos
    deletePrevoiusData(myBodyArticle);

    const myH5 = document.createElement("h5");
    myH5.style.fontSize = "30px";
    myH5.classList.add("modal-title", "text-white", "mx-3");
    myH5.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
    
    // Crear un div para mostrar el tipo de especie
    const typePokemonDiv = document.createElement("div");
    typePokemonDiv.classList.add("type-pokemon-div", "modal-type", "text-center", "mx-3", "typePokemonDiv");
    
    // Agregar el tipo de especie debajo del nombre
    const speciesType = document.createElement("small");
    speciesType.classList.add("species-type", "text-white");
    datos.Pokemon.dibujarPokemon(pokemon)
    .then(data => {
        const pokemonType = data.types[0].type.name;
        speciesType.textContent = `${pokemonType}`.charAt(0).toUpperCase() + pokemonType.slice(1);
    })
    .catch(error => {
        console.error("Error al obtener el tipo:", error);
    });
    
    // Obtener el número de la Pokédex
    const pokemonNumber = String(index + 1).padStart(3, "0"); // Formatear el número con ceros a la izquierda

    // Crear un div para mostrar el tipo de especie y el número de la Pokédex
    const typeNumberDiv = document.createElement("div");
    typeNumberDiv.classList.add("modal-number" ,"type-number-div", "d-flex", "justify-content-end", "mx-3");
    // Agregar el número de la Pokédex
    const pokedexNumber = document.createElement("small");
    pokedexNumber.classList.add("pokedex-number", "text-white", "pokedexNumber");
    pokedexNumber.textContent = `#${pokemonNumber}`;

    // typeNumberDiv.appendChild(speciesType);
    
    myBodyArticle.appendChild(myH5);

    typeNumberDiv.appendChild(pokedexNumber);
    myBodyArticle.appendChild(typeNumberDiv);
    
    typePokemonDiv.appendChild(speciesType);
    myBodyArticle.appendChild(typePokemonDiv);

    // Agregar la imagen del Pokémon.
    const myImg = document.createElement("img");
    myImg.classList.add("modal-picture");
    myImg.src = `https://play.pokemonshowdown.com/sprites/ani/${pokemon}.gif`;
    myImg.classList.add("card-img-top", "mx-auto");
    myImg.style.width = "200px";
    myImg.style.height = "200px";

    myBodyArticle.appendChild(myImg);
    
    const informationButtons = ["About", "Base Stats", "Evolution", "Moves"];
    const buttonsContainer1 = document.createElement("div");
    buttonsContainer1.classList.add("w-100", "rounded-top-4", "text-center", "information-buttons");
    buttonsContainer1.style.backgroundColor = "white";

    // Crear un elemento <p> para mostrar información
    const p = document.createElement("p");
    p.style.backgroundColor = "white";
    p.style.paddingLeft = "63px";
    p.classList.add("m-0", "information-pokemon");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("information-pokemon");

    informationButtons.forEach(buttonName => {
        const myButton = document.createElement("button");
        myButton.classList.add("btn", "btn-color", "px-4");
        myButton.style.border = "none";
        myButton.textContent = buttonName;

        buttonsContainer1.appendChild(myButton);

        myButton.addEventListener("click", ev => {
            p.innerText = "";
            imageContainer.innerText = "";
            imageContainer.innerHTML = "";

            datos.Pokemon.dibujarPokemon(pokemon).then(data => {
                if (buttonName === informationButtons[0]){
                    p.innerHTML = `Species: <strong>${data.species.name}.</strong><br>
                                   Height: <strong>${data.height * 10 + " cm."}</strong><br>
                                   Weight: <strong>${data.weight + " lb."}</strong><br>
                                   Abilities: <strong>${data.abilities.map(ability => ability.ability.name).join(", ")}.</strong>`;
                }
                if (buttonName === informationButtons[1]) {
                    p.appendChild(showStats(data));
                }
                if (buttonName === informationButtons[2]) {
                    fetch(data.species.url)
                        .then(response => response.json())
                        .then(speciesData => {
                            const evolutionChainUrl = speciesData.evolution_chain.url;
                            fetch(evolutionChainUrl)
                                .then(response => response.json())
                                .then(evolutionData => {
                                    // const evolutionChain = evolutionData.chain;
                                    let currentChain = evolutionData.chain;
                                    
                                    // Agregar las imágenes de todas las evoluciones anteriores
                                    while (currentChain) {
                                        addEvolutionImage(currentChain.species.name, imageContainer);
                                        currentChain = currentChain.evolves_to[0];
                                    }
                                })
                                .catch(error => {
                                    console.error("Error al obtener la cadena de evolución:", error);
                                });
                        })
                        .catch(error => {
                            console.error("Error al obtener los datos de la especie:", error);
                        });

                        buttonsContainer1.appendChild(imageContainer);
                }
                if (buttonName === informationButtons[3]) {
                    const maxMovesToShow = 5;
                    const movesToDisplay = data.moves.slice(0, maxMovesToShow);
                
                    const movesList = movesToDisplay.map(move => move.move.name).join("<br>");
                    p.innerHTML = `Movimientos: <br><strong>${movesList}</strong>`;
                }               
            });
        });
    });

    myBodyArticle.appendChild(buttonsContainer1);
    myBodyArticle.appendChild(p);
};

const deletePrevoiusData = (myBodyArticle) => {
    // Verificar si ya existe un elemento previo
    const currentTitle = myBodyArticle.querySelector(".modal-title");
    if (currentTitle) {
        myBodyArticle.removeChild(currentTitle);
    }

    const currentType = myBodyArticle.querySelector(".modal-type");
    if (currentType) {
        myBodyArticle.removeChild(currentType);
    }

    const currentNumber = myBodyArticle.querySelector(".modal-number");
    if (currentNumber) {
        myBodyArticle.removeChild(currentNumber);
    }

    // Verificar si ya existe un elemento previo
    const currentElement = myBodyArticle.querySelector(".modal-picture");
    if (currentElement) {
        myBodyArticle.removeChild(currentElement);
    }

    // Eliminar botones anteriores
    const buttonsContainerInformation = document.querySelector(".information-buttons");
    if (buttonsContainerInformation) {
        myBodyArticle.removeChild(buttonsContainerInformation);
    }

    // Eliminar botones anteriores
    const informationContainerPokemon = document.querySelector(".information-pokemon");
    if (informationContainerPokemon) {
        myBodyArticle.removeChild(informationContainerPokemon);
    }
}

const showStats = (data) => {
    // Crear un contenedor para las estadísticas
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    // Inicializar la variable para almacenar el valor máximo de estadística
    let maximo = -Infinity;

    // Iterar a través de cada estadística del Pokémon para encontrar el valor máximo
    data.stats.forEach(stat => {
        // Comprobar si la estadística actual es mayor que el valor máximo actual
        if (stat.base_stat > maximo) {
            // Actualizar el valor máximo con la estadística actual si es mayor
            maximo = stat.base_stat;
        }
    });

    // Imprimir el valor máximo en la consola para verificar
    console.log(maximo);

    data.stats.forEach(stat => {
        // Obtiene el nombre de la estadística y su valor base
        const statName = stat.stat.name;
        const statValue = stat.base_stat;

        // Crea un elemento <div> para mostrar la estadística
        const statElement = document.createElement("div");
        statElement.classList.add("stat", "row");

        // Crea un elemento <div> para contener la información de la estadística
        const statInfoElement = document.createElement("div");
        statInfoElement.classList.add("stat-info", "col-sm-6", "col-12");

        // Crea un elemento <span> para mostrar el nombre de la estadística
        const statNameElement = document.createElement("span");
        statNameElement.classList.add("stat-name");
        statNameElement.textContent = statName;

        // Crea un elemento <span> para mostrar el valor de la estadística
        const statValueElement = document.createElement("span");
        statValueElement.classList.add("stat-value");
        statValueElement.textContent = statValue;

        // Crea un elemento <div> para representar la barra de la estadística
        const statBarElement = document.createElement("div");
        const statBarElementParent = document.createElement("div");
        statBarElementParent.style.width = "220px";
        statBarElementParent.classList.add("col-12");
        document.body.appendChild(statBarElement);
        statBarElement.classList.add("stat-bar");

        // Calcula la equivalencia de la anchura de la barra basada en el valor de la estadística
        let equivalencia = (parseInt(getComputedStyle(statBarElement).getPropertyValue("width")) / maximo) * statValue;
        console.log(equivalencia);
        statBarElement.style.backgroundColor = getTypeColor(data.types[0].type.name);

        // Elimina el elemento temporal de la barra del cuerpo del documento
        document.body.removeChild(statBarElement);

        // Establece el ancho de la barra de la estadística
        statBarElement.style.width = `${equivalencia}px`;
        statBarElementParent.appendChild(statBarElement);

        // Agrega el nombre y valor de la estadística al contenedor de información de la estadística
        statInfoElement.appendChild(statNameElement);
        statInfoElement.appendChild(statValueElement);

        // Agrega la información de la estadística y la barra al elemento principal de la estadística
        statElement.appendChild(statInfoElement);
        statElement.appendChild(statBarElementParent);

        // Agrega el elemento de la estadística al contenedor general de estadísticas
        statsContainer.appendChild(statElement);
    });
    return statsContainer;
}

// Función para agregar una imagen al contenedor
const addEvolutionImage = (pokemonName, imageContainer) => {
    const img = document.createElement("img");
    img.src = `https://play.pokemonshowdown.com/sprites/ani/${pokemonName}.gif`;
    img.alt = 'Pokémon Evolution';
    img.classList.add("evolution-gif", "mx-5");
    imageContainer.appendChild(img);
};

document.querySelector(".like-button").addEventListener("click", function (){
    document.querySelector(".like-button").classList.toggle("fa-solid");
});
