

function Pokemon(){

    const showPokemonSpecies = function (){
        return "Especie: ";
    }

    const showPokemonHeight = function (){
        return "Altura: ";
    }

    const showPokemonWeight = function (){
        return "Peso: ";
    }

    const showPokemonType = function (){
        return "Tipo: ";
    }

    const showPokemonStats = function (){
        return "Stats: ";
    }

    const showPokemonMoves = function (){
        return "Movimientos: ";
    }

}

const backToTopBtn = document.getElementsByClassName("back-to-top-button")[0];

// Agregar un evento de desplazamiento para controlar cuándo mostrar u ocultar el botón
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 1000) {
        backToTopBtn.style.display = "block"; // Mostrar el botón si el desplazamiento es mayor a 1500 píxeles
    } else {
        backToTopBtn.style.display = "none"; // Ocultar el botón si el desplazamiento es menor o igual a 1500 píxeles
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
    }, 10);
});
