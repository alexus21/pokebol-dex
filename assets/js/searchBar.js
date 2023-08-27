
const searchPokemonBtn = document.querySelector("[data-search-pokemon-btn]");
searchPokemonBtn.setAttribute("data-bs-toggle", "modal"); // Atributo de Bootstrap para activar el modal

// Maneja el evento de clic en el botón de búsqueda de Pokémon.
searchPokemonBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Detener el comportamiento predeterminado del botón de enviar

    const input = document.querySelector("[data-input]");
    const h5Elements = Array.from(document.querySelectorAll(".card-title")); // Convertir NodeList a Array
    const pokemonToSearch = input.value.toLowerCase();

    let found = false; // Variable para verificar si se encontró un Pokémon

    if (pokemonToSearch === "") {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        showAlert("Error: Ingresa el nombre del Pokémon a buscar");
        return;
    }

    for (const [index, title] of h5Elements.entries()) {
        const pokemonName = title.textContent.toLowerCase();
        const section = title.closest(".poke-card");

        if (pokemonName.includes(pokemonToSearch)) {
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

            found = true; // Se encontró un Pokémon, establecer la variable a true
            break; // Salir del ciclo una vez que se encuentra un Pokémon
        }
    }

    // Si no se encuentra nada...
    if (!found && pokemonToSearch !== "" && !searchPokemonBtn.disabled) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        showAlert("El Pokémon que buscas no ha sido encontrado");
        input.value = "";
    }
});

const showAlert = (message) => {
    const myErrorBody = document.querySelector(".showError");
    myErrorBody.classList.add("d-flex", "justify-content-center");

    // Verificar si ya existe un elemento previo
    const currentItem = myErrorBody.querySelector(".alert");
    if (currentItem) {
        myErrorBody.removeChild(currentItem);
    }

    const myAlertArticle = document.createElement("article");
    myAlertArticle.classList.add("alert", "alert-danger", "m-3", "modal-error", "w-25", "text-center");
    myAlertArticle.setAttribute("role", "alert");
    myAlertArticle.textContent = message;

    setTimeout(function (){
        myAlertArticle.classList.toggle("d-none");
    }, 3000);

    myErrorBody.appendChild(myAlertArticle);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
