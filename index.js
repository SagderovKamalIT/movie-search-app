let movies = [];

const NOT_FOUND_MOVIE = 'Фильмы не найдены';
const ACTIVE_SEARCH_BUTTON = 'search__button-active';

const searchInputNode = document.querySelector('.js-search__input');
const searchButtonNode = document.querySelector('.js-search__button');
const moviesList = document.querySelector('.js-movie__list');



const renderMovie = (movies) => {

    let moviesHTML  = '';

    movies.forEach(movie => {
        moviesHTML += `
    
    <div class='movies__container' >
      <div class='card__image' >
      <img  class='card__img' src='${movie.Poster}' alt='${movie.Title}' >
     </div>

    <div class="card">
    <h3 class='card__header' >${movie.Title}</h3>
    <p class='card__year' >${movie.Year}</p>
    <p class='card__type' >${movie.Type}</p>
    </div>
    </div>
    
        `
    });

    moviesList.innerHTML = moviesHTML;


}


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
                console.log("Фильм найден: ", data.Search);
                renderMovie(data.Search);
            }
 
            if (data.Response === 'False') {
                console.log("Фильм не найден: ", data.Search);
                moviesList.innerHTML = `
                 <div class='no-movies__container' >
                 <p class='card__header'>${NOT_FOUND_MOVIE}</p>
                 </div>
                `



            }
        })
    }
)

