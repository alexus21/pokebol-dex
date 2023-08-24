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

export const getSpecies = async (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    return timeOut(url);
};

export const getHeight = async (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    return timeOut(url);
};

export const getWeight = async (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    return timeOut(url);
};

export const getType = async (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    return timeOut(url);
};

export const getAbilities = async (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    return timeOut(url);
};

export const getStats = async (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    return timeOut(url);
};

export const getMoves = async (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    return timeOut(url);
};


