const logoBtn = document.querySelector("[data-logo]");
const searchPokemonBtn = document.querySelector("[data-search-pokemon-btn]");
const modalInfo = document.querySelector("#modalInfo"); // Obtener la referencia al modal

// Maneja el evento de clic en el botón de logo para volver al inicio de la página.
logoBtn.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Maneja el evento de clic en el botón de búsqueda de Pokémon.
searchPokemonBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Detener el comportamiento predeterminado del botón de enviar

    const input = document.querySelector("[data-input]");
    const h5Elements = Array.from(document.querySelectorAll(".card-title")); // Convertir NodeList a Array
    const pokemonToSearch = input.value.toLowerCase();

    let found = false; // Variable para verificar si se encontró un Pokémon

    for (const [index, title] of h5Elements.entries()) { // Usar entries() para obtener índice y valor
        const pokemonName = title.textContent.toLowerCase();
        const section = title.closest(".poke-card");

        if (pokemonToSearch === "") {
            alert("Ingresa el nombre del Pokémon a buscar");
            break; // Salir del ciclo si no se ingresó un nombre
        }

        if (pokemonName.indexOf(pokemonToSearch) !== -1) {
            section.scrollIntoView();
            section.classList.add("found-card");
            searchPokemonBtn.disabled = true;
            input.value = "";

            const myCloseButton = document.createElement("button");
            myCloseButton.classList.add("btn", "btn-primary", "closeButton");
            myCloseButton.textContent = "Cerrar";
            section.appendChild(myCloseButton);

            myCloseButton.addEventListener("click", function (){
                section.classList.remove("found-card");
                myCloseButton.classList.add("d-none");
                searchPokemonBtn.disabled = false;
            });

            document.querySelector("[data-close-button]").addEventListener("click", function (){
                myCloseButton.classList.add("d-none");
                searchPokemonBtn.disabled = false;
            });

            document.querySelector("[data-close-button]").addEventListener("click", function() {
                section.classList.remove("found-card");
            });

            // section.removeChild(myCloseButton);

            found = true; // Se encontró un Pokémon, establecer la variable a true
            break; // Salir del ciclo una vez que se encuentra un Pokémon
        }
    }

    // Si no se encuentra nada...
    if (!found && pokemonToSearch !== "") {
        alert("No encontrado");
        input.value = "";
    }
});


