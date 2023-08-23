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

    const showPokemonStatistics = function (){
        return "Habilidades: ";
    }

}

export const showPokemon = (pokemonList) => {
    const body = document.querySelector(".poke-card");

    pokemonList.forEach(pokemon => {
        const myH5 = document.createElement("h5");
        myH5.textContent = pokemon;
        body.appendChild(myH5);
    });
};
