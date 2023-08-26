export const presentByTypes = (pokemonType) => {
    const pokemonListByType = document.querySelector(".pokemonListByType");

    const myLi = document.createElement("li");
    myLi.textContent = pokemonType;
    pokemonListByType.appendChild(myLi);

    console.log(pokemonType);
}
