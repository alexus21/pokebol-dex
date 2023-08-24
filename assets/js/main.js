

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

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 1500) {
        backToTopBtn.style.display = "block";
    }
    else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
