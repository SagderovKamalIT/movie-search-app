
let movies = [];

const NOT_FOUND_MOVIE = 'По вашему запросу не найденно результатов';
const ACTIVE_SEARCH_BUTTON = 'search__button-active';

const searchInputNode = document.querySelector('.js-search__input');
const searchButtonNode = document.querySelector('.js-search__button');
const moviesList = document.querySelector('.js-movie__list');




const loadMoviesFromStorage = () => {

    const moviesString = localStorage.getItem('movies');

    if (moviesString) {
        return JSON.parse(moviesString);
    }

    return [];

}




const renderMovie = (movies) => {

    let moviesHTML  = '';

    movies.forEach(movie => {
        moviesHTML += `
    
    <li class='movies__container' data-id='${movie.imdbID}'>
      <div class='card__image' >
      <img  class='card__img' src='${movie.Poster}' alt='${movie.Title}' >
     </div>

    <div class="card">
    <h3 class='card__header' >${movie.Title}</h3>
    <p class='card__year' >${movie.Year}</p>
    <p class='card__type' >${movie.Type}</p>
    </div>
    </li>
    
        `

    });


    

    moviesList.innerHTML = moviesHTML;

    const movieItems = document.querySelectorAll('.movies__container');
    movieItems.forEach(item => {
         item.addEventListener('click', function(){
             const movieId = item.getAttribute('data-id');
             openMovieDetails(movieId);
         });
    });

    saveMoviesToStorage(movies);


}

const saveMoviesToStorage = (movies) => {
const moviesString = JSON.stringify(movies);;
localStorage.setItem ('movies', moviesString);
}

const openMovieDetails = (movieId) => {
       // меняю URL страницы 
        window.location.href = `movie-details.html?id=${movieId}`
};



searchButtonNode.addEventListener('click', function(){
     const movieName = searchInputNode.value.trim();

     if (!movieName) {
        alert('Введите название фильма');
        return;
     }

     searchButtonNode.classList.add(ACTIVE_SEARCH_BUTTON);

       const movieURL = `https://www.omdbapi.com/?s=${movieName}&apikey=31af0e57`;
  


        fetch(movieURL)
        .then(response => response.json())
        .then(data => {

                if (data.Response === 'True') {
                    // создание локальной переменной
                    const foundMovies = data.Search;
    
                    // объединение старых фильмов с новыми
                    movies = [...movies, ...foundMovies]; 
    
                    renderMovie(movies);
                } else {
                    moviesList.innerHTML = `<p>${NOT_FOUND_MOVIE}</p>`;
                }
            });
});

