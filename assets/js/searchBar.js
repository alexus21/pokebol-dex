import {showPokemonName, showPokemonPicture} from "./cardCreator.js";

const logoBtn = document.querySelector("[data-logo]");
const searchPokemonBtn = document.querySelector("[data-search-pokemon-btn]");
const modalInfo = document.querySelector("#modalInfo"); // Obtener la referencia al modal

logoBtn.addEventListener("click", function (){
    event.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

searchPokemonBtn.addEventListener("click", function (event){
    event.preventDefault(); // Detener el comportamiento predeterminado del botón de enviar
    const input = document.querySelector("[data-input]");
    const h5Elements = Array.from(document.querySelectorAll(".card-title")); // Convertir NodeList a Array
    const pokemonToSearch = input.value.toLowerCase();

    let found = false; // Variable para verificar si se encontró un Pokémon

    for (const [index, title] of h5Elements.entries()) { // Usar entries() para obtener índice y valor
        const pokemonName = title.textContent.toLowerCase();
        const section = title.closest(".poke-card");

        if (pokemonToSearch === "") {
            alert("Ingresa el nombre del pokemon a buscar");
            break; // Salir del ciclo si no se ingresó un nombre
        }

        if (pokemonName.includes(pokemonToSearch)) {
            section.scrollIntoView();
            section.classList.add("found-card");

            document.querySelector("[data-close-button]").addEventListener("click", function (){
                section.classList.remove("found-card");
            });

            found = true; // Se encontró un Pokémon, establecer la variable a true
            break; // Salir del ciclo una vez que se encuentra un Pokémon
        }
    }

    if (!found && pokemonToSearch !== "") {
        alert("No encontrado");
        input.value = "";
    }
});
