import * as pokemonInfo from "./getPokemonGeneralInfo.js";
import {getSpecies, getType} from "./getPokemonGeneralInfo.js";
import {presentByTypes} from "./showByType.js";

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

        // Agregar la imagen del Pokémon.
        const myImg = document.createElement("img");
        // myImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`; // Incrementar el índice en 1
        myImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`; // Cambiar la URL para obtener el GIF
        myImg.classList.add("card-img-top");
        myImg.alt = "Imagen de " + pokemon;

        // Crear un div para mostrar el tipo de especie
        const typePokemonDiv = document.createElement("div");
        typePokemonDiv.classList.add("type-pokemon-div", "text-center");

        // Agregar estilos al div usando la propiedad style
        // typePokemonDiv.style.color = "white";
        typePokemonDiv.style.borderRadius = "25px";
        typePokemonDiv.style.width = "60px";
        typePokemonDiv.style.backgroundColor = "rgba(255, 255, 255, 0.4)";

        // Obtener el tipo del Pokémon
        getType(pokemon)
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
        getType(pokemon)
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

        myArticle.appendChild(myImg);
        myArticle.appendChild(myButton);

        // Agregar el artículo al section.
        mySection.appendChild(myArticle);

        // Agregar la sección al main
        main.appendChild(mySection);
    });
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

export const showModalInfo = (pokemon, index) => {
    // showPokemonName(pokemon);
    showPokemonPicture(index, pokemon);
    // getPokemonAboutInfo(pokemon);
}

// const showPokemonName = (pokemon) => {
//     const myHeaderArticle = document.querySelector(".modal-header");
//     // myHeaderArticle.style.backgroundColor = getTypeColor(getType(pokemon));
//     const pokemonType = data.types[0].type.name;
//     const typeColor = getTypeColor(pokemonType);
//     myHeaderArticle.style.backgroundColor = typeColor;

//     // Verificar si ya existe un elemento previo
//     const currentItem = myHeaderArticle.querySelector(".modal-title");
//     if (currentItem) {
//         myHeaderArticle.removeChild(currentItem);
//     }

//     const myH5 = document.createElement("h5");
//     myH5.classList.add("modal-title", "fs-5");
//     myH5.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);

//     myHeaderArticle.appendChild(myH5);
// };

// const showPokemonName = (pokemon) => {
//     getType(pokemon)
//     .then(data => {
//         const myHeaderArticle = document.querySelector(".modal-body");
//         const pokemonType = data.types[0].type.name;
//         const typeColor = getTypeColor(pokemonType);
//         myHeaderArticle.style.backgroundColor = typeColor;

//         // Verificar si ya existe un elemento previo
//         const currentItem = myHeaderArticle.querySelector(".modal-title");
//         if (currentItem) {
//             myHeaderArticle.removeChild(currentItem);
//         }

//         const myH5 = document.createElement("h5");
//         myH5.classList.add("modal-title", "fs-5");
//         myH5.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);

//         myHeaderArticle.appendChild(myH5);
//     })
//     .catch(error => {
//         console.error("Error al obtener el tipo:", error);
//     });
// };

const showPokemonPicture = (index, pokemon) => {
    const myBodyArticle = document.querySelector(".modal-body");
    const myHeaderArticle = document.querySelector(".modal-header"); 
    myBodyArticle.classList.add("d-flex", "flex-column"); // centrar imagen de pokemon

    getType(pokemon)
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

    const myH5 = document.createElement("h5");
    myH5.style.fontSize = "30px";
    // myH5.classList.add("modal-title", "fs-5", "text-white", "mx-4");
    myH5.classList.add("modal-title", "text-white", "mx-3");
    myH5.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
    
    // Crear un div para mostrar el tipo de especie
    const typePokemonDiv = document.createElement("div");
    typePokemonDiv.classList.add("type-pokemon-div", "modal-type", "text-center", "mx-3");
    
    //  Agregar estilos al div usando la propiedad style
    typePokemonDiv.style.fontWeight = "500";
    typePokemonDiv.style.borderRadius = "25px";
    typePokemonDiv.style.width = "60px";
    typePokemonDiv.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    
    // Agregar el tipo de especie debajo del nombre
    const speciesType = document.createElement("small");
    speciesType.classList.add("species-type", "text-white");
    getType(pokemon)
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
    pokedexNumber.classList.add("pokedex-number", "text-white");
    pokedexNumber.style.fontSize = "20px";
    pokedexNumber.style.fontWeight = "500";
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
    // myImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`; // Incrementar el índice en 1
    // myImg.src = `https://projectpokemon.org/images/normal-sprite/${pokemon}.gif`; // URL del GIF
    myImg.src = `https://play.pokemonshowdown.com/sprites/ani/${pokemon}.gif`;
    myImg.classList.add("card-img-top", "mx-auto");
    myImg.style.width = "200px";
    myImg.style.height = "200px";

    myBodyArticle.appendChild(myImg);
    
    const informationButtons = ["About", "Base Stats", "Evolution", "Moves"];
    const buttonsContainer1 = document.createElement("div");
    buttonsContainer1.classList.add("w-100", "rounded-top-4", "text-center");
    buttonsContainer1.style.backgroundColor = "white";
    buttonsContainer1.classList.add("information-buttons");
    // buttonsContainer.classList.add("d-flex", "align-items-center"); // Aplicar flex-direction column y centrar elementos horizontalmente

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

            pokemonInfo.getSpecies(pokemon).then(data => {
                if (buttonName === informationButtons[0]){
                    p.innerHTML = `Species: <strong>${data.species.name}.</strong><br>
                                   Height: <strong>${data.height * 10 + " cm."}</strong><br>
                                   Weight: <strong>${data.weight + " lb."}</strong><br>
                                   Abilities: <strong>${data.abilities.map(ability => ability.ability.name).join(", ")}.</strong>`;
                }
                if (buttonName === informationButtons[1]) {
                    const statsContainer = document.createElement("div");
                    statsContainer.classList.add("stats-container");
                    let maximo = -Infinity;

                    data.stats.forEach(stat => {
                        if (stat.base_stat > maximo) {
                            maximo = stat.base_stat;
                        }
                    });

                    console.log(maximo);


                    data.stats.forEach(stat => {
                        const statName = stat.stat.name;
                        const statValue = stat.base_stat;
                
                        const statElement = document.createElement("div");
                        statElement.classList.add("stat");
                
                        const statInfoElement = document.createElement("div");
                        statInfoElement.classList.add("stat-info");
                
                        const statNameElement = document.createElement("span");
                        statNameElement.classList.add("stat-name");
                        statNameElement.textContent = statName;
                
                        const statValueElement = document.createElement("span");
                        statValueElement.classList.add("stat-value");
                        statValueElement.textContent = statValue;
                
                        const statBarElement = document.createElement("div");
                        document.body.appendChild(statBarElement);
                        statBarElement.classList.add("stat-bar");

                        let equivalencia = (parseInt(getComputedStyle(statBarElement).getPropertyValue("width")) / maximo) * statValue;
                        console.log(equivalencia);

                        document.body.removeChild(statBarElement);
                        statBarElement.style.width = `${equivalencia}px`;


                        statInfoElement.appendChild(statNameElement);
                        statInfoElement.appendChild(statValueElement);
                        statElement.appendChild(statInfoElement);
                        statElement.appendChild(statBarElement);
                
                        statsContainer.appendChild(statElement);
                    });
                
                    p.appendChild(statsContainer);
                }
                if (buttonName === informationButtons[2]) {
                    fetch(data.species.url)
                        .then(response => response.json())
                        .then(speciesData => {
                            const evolutionChainUrl = speciesData.evolution_chain.url;
                            fetch(evolutionChainUrl)
                                .then(response => response.json())
                                .then(evolutionData => {
                                    const evolutionChain = evolutionData.chain;
                                    
                                    // Función para agregar una imagen al contenedor
                                    const addEvolutionImage = (pokemonName) => {
                                        const img = document.createElement("img");
                                        img.src = `https://play.pokemonshowdown.com/sprites/ani/${pokemonName}.gif`;
                                        img.alt = 'Pokémon Evolution';
                                        img.classList.add("evolution-gif", "mx-5");
                                        // imageContainer.style.width = "100px";
                                        // imageContainer.style.height = "100px";
                                        imageContainer.appendChild(img);
                                    };
                                
                                    let currentChain = evolutionChain;
                                    
                                    // Agregar las imágenes de todas las evoluciones anteriores
                                    while (currentChain) {
                                        addEvolutionImage(currentChain.species.name);
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
                // if (buttonName === informationButtons[3]){
                //     p.innerText = `Movimientos: ${data.moves.map(move => move.move.name)}`;
                // }
                if (buttonName === informationButtons[3]) {
                    const maxMovesToShow = 5;
                    const movesToDisplay = data.moves.slice(0, maxMovesToShow);
                
                    const movesList = movesToDisplay.map(move => move.move.name).join("<br>");
                    p.innerHTML = `Movimientos: <br><strong>${movesList}</strong>`;
                }               
            })
        })
        // buttonsContainer1.appendChild(p);
    });

    myBodyArticle.appendChild(buttonsContainer1);
    myBodyArticle.appendChild(p);
};

const getPokemonAboutInfo = (pokemon) => {
    // try {
    //     const data =  getSpecies(pokemon);
    //     const pokemonSpecie = data.species.name;

    //     // Puedes agregar más información aquí
    //     return `Especie: ${pokemonSpecie}`;
    //     // return aboutInfo;
    // } catch (error) {
    //     console.error("Error al obtener la información 'About':", error);
    //     return "No se pudo obtener la información";
    // }
    getSpecies(pokemon).then(data => {
        const pokemonSpecie = data.species.name;
        return `Especie: ${pokemonSpecie}`;
    }).catch(error => {
        console.error("Error al obtener la especie:", error);
        return "No se pudo obtener la informacion";
    });
};

// ...