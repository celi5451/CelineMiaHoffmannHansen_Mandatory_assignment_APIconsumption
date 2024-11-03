import { apiKey } from './info.js';

const baseUrl = 'https://api.themoviedb.org';

document.querySelectorAll('nav button').forEach((menuOption) => {
    menuOption.addEventListener('click', function() {
        queryFilms(this.id);

        const selectedMenuOption = document.querySelector('nav button.selected');
        if (selectedMenuOption !== null) {
            selectedMenuOption.classList.remove('selected');
        }
        this.classList.add('selected');
    });
});

const queryFilms = (query) => {
    const endpoint = `${baseUrl}/3/movie/${query}`;

    fetch(endpoint, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then((response) => { 
        if (response.ok) {
            return response.text();
        } else {
            console.log('Response error', `${response.status} - ${response.statusText}`);
        }
    })
    .then((data) => showFilms(JSON.parse(data)))
    .catch((error) => console.log('Fetch error', error));
};

const showFilms = (films) => {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const filmList = document.createElement('section');
    films.results.forEach((film) => {
        const filmCard = document.createElement('article');
        filmCard.classList.add('film');
        filmCard.innerHTML = `
            <header>
                <h2>${film.title}</h2>
            </header>
            <div class="film-content">
                <img src="https://image.tmdb.org/t/p/w154/${film.poster_path}">
                <div>
                    <p>${film.overview}</p>
                    <p class="film-info original-title">${film.original_title}</p>
                    <p class="film-info date">${film.release_date}</p>
                </div>
            </div>
        `;
        filmList.append(filmCard);
    });
    main.append(filmList);
};