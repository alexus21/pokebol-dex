// Importar la función resetView desde otro archivo
import {resetView} from "./showByType.js";

// Obtener el botón de búsqueda de Pokémon por su atributo de datos
const searchPokemonBtn = document.querySelector("[data-search-pokemon-btn]");
searchPokemonBtn.setAttribute("data-bs-toggle", "modal"); // Atributo de Bootstrap para activar el modal

// Maneja el evento de clic en el botón de búsqueda de Pokémon.
searchPokemonBtn.addEventListener("click", function(event) {
    resetView(); // Restablecer la vista de Pokémon
    event.preventDefault(); // Detener el comportamiento predeterminado del botón de enviar

    // Obtener el campo de entrada y todos los elementos h5 (títulos de las cartas)
    const input = document.querySelector("[data-input]");
    const h5Elements = Array.from(document.querySelectorAll(".card-title")); // Convertir NodeList a Array
    const pokemonToSearch = input.value.toLowerCase();

    let found = false; // Variable para verificar si se encontró un Pokémon

    // Validación: si el campo de búsqueda está vacío
    if (pokemonToSearch === "") {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        showAlert("Error: Ingresa el nombre del Pokémon a buscar");
        return;
    }

    // Iterar a través de los títulos de las cartas
    for (const [index, title] of h5Elements.entries()) {
        const pokemonName = title.textContent.toLowerCase();
        const section = title.closest(".poke-card");

        // Si el nombre del Pokémon incluye la cadena de búsqueda
        if (pokemonName.includes(pokemonToSearch)) {
            section.scrollIntoView(); // Desplazar hasta la sección de la carta
            section.classList.add("found-card"); // Agregar clase de estilo para resaltar
            searchPokemonBtn.disabled = true; // Deshabilitar el botón de búsqueda
            input.value = "";

            // Crear botón de cierre para restablecer el resaltado
            const myCloseButton = document.createElement("button");
            myCloseButton.classList.add("btn", "btn-primary", "closeButton");
            myCloseButton.textContent = "Cerrar";
            section.appendChild(myCloseButton);

            // Manejar el evento clic en el botón de cierre
            myCloseButton.addEventListener("click", function (){
                section.classList.remove("found-card"); // Restablecer el resaltado
                myCloseButton.classList.add("d-none"); // Ocultar el botón de cierre
                searchPokemonBtn.disabled = false; // Habilitar el botón de búsqueda
            });

            // Manejar el evento clic en el botón de cierre en el modal
            document.querySelector("[data-close-button]").addEventListener("click", function (){
                myCloseButton.classList.add("d-none");
                searchPokemonBtn.disabled = false;
            });

            // Manejar el evento clic en otro botón de cierre en el modal
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

/**
 * Muestra una alerta en el modal.
 */
const showAlert = (message) => {
    const myErrorBody = document.querySelector(".showError");
    myErrorBody.classList.add("d-flex", "justify-content-center");

    // Verificar si ya existe un elemento previo
    const currentItem = myErrorBody.querySelector(".alert");
    if (currentItem) {
        myErrorBody.removeChild(currentItem);
    }

    // Crear y mostrar la alerta
    const myAlertArticle = document.createElement("article");
    myAlertArticle.classList.add("alert", "alert-danger", "m-3", "modal-error", "w-25", "text-center");
    myAlertArticle.setAttribute("role", "alert");
    myAlertArticle.textContent = message;

    // Función para ocultar alerta de evento de búsqueda:
    setTimeout(function (){
        myAlertArticle.classList.toggle("d-none");
    }, 3000); // Ocultar la alerta después de 3 segundos

    myErrorBody.appendChild(myAlertArticle);

    // Si el usuario está hasta abajo, hacer un scroll to top, para que la alerta aparezca al tope de la página:
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
