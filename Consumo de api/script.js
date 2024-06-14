// Referencias iniciales
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Función para obtener datos de la API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // Si el campo de entrada está vacío
    if (movieName.length === 0) {
        result.innerHTML = '<h3 class="msg">Por favor ingresa el nombre de una película</h3>';
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // Si la película existe en la base de datos
                if (data.Response === "True") {
                    result.innerHTML = `
                        <div class="info">
                            <img src="${data.Poster}" class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <img src="star-icon.svg">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                            <div>
                                <h3>Argumento:</h3>
                                <p>${data.Plot}</p>
                                <h3>Elenco:</h3>
                                <p>${data.Actors}</p>
                            </div>
                        </div>`;
                } else {
                    // Si la película no existe en la base de datos
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                // Si ocurre un error
                result.innerHTML = `<h3 class="msg">Ha ocurrido un error</h3>`;
            });
    }
};

// Event Listener para el botón de búsqueda
searchBtn.addEventListener("click", getMovie);

// Event Listener para cargar la página
window.addEventListener("load", getMovie);

fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        // Si la película existe en la base de datos
        if (data.Response == "True") {
            result.innerHTML = `
                <div class="info">
                    <img src="${data.Poster}" class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            ${data.Genre.split(",").map(genre => `<div>${genre}</div>`).join("")}
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>`;
        } else {
            // Si la película no existe en la base de datos
            result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
    })
    .catch(() => {
        // Si ocurre un error
        result.innerHTML = `<h3 class="msg">Ha ocurrido un error</h3>`;
    });
