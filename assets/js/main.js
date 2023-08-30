export const Pokemons = (function()  {
    const getPokemonList = async () => {
        const pokemonNumber = 150;

        return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
            .then(response => {
                if (response.ok) {
                    return response.json(); // Convertir la respuesta a JSON y retornar los datos
                } else {
                    throw new Error("Error al procesar datos: " + response.status);
                }
            });

    }

    return{
        getPokemonDetails: getPokemonList
    }
})();

export const Pokemon = (() => {
    const traerMetodo = Object.create(Pokemons);

    const timeOut = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al procesar datos");
            }
            return await response.json();
        } catch (error) {
            throw new Error("Error: " + error);
        }
    };

    const getInfo = async function (pokemonName) {
        return traerMetodo.getPokemonDetails()
            .then(data => {
                const pokemon = data.results.find(p => p.name === pokemonName);

                if (pokemon) {
                    return timeOut(pokemon.url);
                } else {
                    return null;
                }
            })
            .catch(error => {
                console.error('Error al obtener la lista de Pokémon:', error);
                return null;
            });
    }

    return {
        dibujarPokemon:getInfo
    }
})();

const backToTopBtn = document.getElementsByClassName("back-to-top-button")[0];
backToTopBtn.style.display = "none"; //Oculto al cargar laa página.

// Agregar un evento de desplazamiento para controlar cuándo mostrar u ocultar el botón
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 1000) {
        backToTopBtn.style.display = "block"; // Mostrar el botón si el desplazamiento es mayor a 1500 píxeles
    }
    else{
        backToTopBtn.style.display = "none";
    }
});

// Agregar un evento de clic al botón "Volver arriba" para desplazarse suavemente al principio de la página
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazarse suavemente al principio de la página
});

document.addEventListener("DOMContentLoaded", function () {
    // Muestra la animación por un período de tiempo (en milisegundos)
    setTimeout(function () {
        // Oculta la animación
        document.querySelector(".center-on-page").classList.add("d-none");

        // Muestra el contenido general
        document.querySelector("main").classList.remove("d-none");
        document.querySelector("nav").classList.remove("d-none");
    }, 5000);
});
