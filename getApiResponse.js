function getApiResponse(pokemon) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        resolve(response.json()); // Convertir la respuesta a JSON y resolver con los datos
                    } else {
                        reject(new Error("Error al procesar datos: " + response.status));
                    }
                })
                .catch(error => reject(error));
        }, 1000);
    });
}

function getPokemonList() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta a JSON y retornar los datos
            } else {
                throw new Error("Error al procesar datos: " + response.status);
            }
        });
}

// Obtener información de los primeros 150 Pokémon.
getPokemonList()
    .then(data => {
        const names = data.results.map(pokemon => pokemon.name);
        return getApiResponse(names[0]);
    })
    .then(pokemonData => {
        console.log(pokemonData); // Imprimir información del primer Pokémon
    })
    .catch(error => console.log("Error: ", error));
