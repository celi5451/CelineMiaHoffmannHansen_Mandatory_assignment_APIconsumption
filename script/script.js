// Import the API key
import { apiKey } from './info.js';

const baseUrl = 'https://api.themoviedb.org';

// Function to query films based on button click
const queryFilms = (query) => {
    const endpoint = `${baseUrl}/3/movie/${query}?api_key=${apiKey}`; // Include the API key in the URL

    fetch(endpoint, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Return the parsed JSON
        })
        .then((data) => {
            console.log('Received data:', data); // Log received data for debugging
            if (data.results) {
                showFilms(data); // Show films if data contains results
            } else {
                console.log('No films found in response'); // Log if no results
            }
        })
        .catch((error) => {
            console.error('Fetch error:', error); // Log fetch errors
        });
};


// Function to display films on the webpage
const showFilms = (films) => {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear previous content

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

// Event listeners for navigation buttons
document.querySelectorAll('nav button').forEach((menuOption) => {
    menuOption.addEventListener('click', function() {
        queryFilms(this.id); // Fetch films based on button ID

        const selectedMenuOption = document.querySelector('nav button.selected');
        if (selectedMenuOption !== null) {
            selectedMenuOption.classList.remove('selected'); // Remove selected class from previous option
        }
        this.classList.add('selected'); // Add selected class to current option
    });
});
