//Función encargada de crear una card para cada Pokémon
export const cardCreator = (pokeData) => {
    const main = document.querySelector("main");

    pokeData.forEach((pokemon, index) => {
        // Crear una nueva sección para la tarjeta de Pokémon.
        const mySection = document.createElement("section");
        mySection.classList.add("card", "poke-card", "m-1");

        // Crear un artículo para el contenido de la tarjeta.
        const myArticle = document.createElement("article");
        myArticle.classList.add("card-body");

        // Crear un encabezado para el nombre del Pokémon.
        const myH5 = document.createElement("h5");
        myH5.classList.add("card-title");
        myH5.textContent = pokemon;

        // Crear un botón para ver más detalles del Pokémon.
        const myButton = document.createElement("button");
        myButton.classList.add("btn", "btn-primary");
        myButton.textContent = "Ver detalles";

        // Agregar la imagen del Pokémon.
        const myImg = document.createElement("img");
        myImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (index + 1) + ".png"; // Incrementar el índice en 1
        myImg.classList.add("card-img-top");
        myImg.alt = "Imagen de " + pokemon;

        // Agregar los elementos al article.
        myArticle.appendChild(myH5);
        myArticle.appendChild(myImg);
        myArticle.appendChild(myButton);

        // Agregar el artículo al section.
        mySection.appendChild(myArticle);

        // Agregar la sección al main
        main.appendChild(mySection);
    });
};
