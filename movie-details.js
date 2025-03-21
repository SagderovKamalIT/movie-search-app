const movieDetails = document.querySelector('.js-details_container');

// получение параметров через URL
const getMovieIdFromURL = () => {
    // URLSearchParams - встроеный объект
    // window.location.search -  получают параметры, через URL
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');
    return movieId;
};


const fetchMovieDetails = () => {
    const MovieId = getMovieIdFromURL();


    if(!MovieId) {
        alert('Ошибка! Фильм не найден');
        return;
    }

    fetch(`https://www.omdbapi.com/?i=${MovieId}&apikey=31af0e57`)
         .then(response => response.json())
         .then(data => {
            if(data.Response === 'True') {
                renderSearchMovie(data);
                return;
            }

         })

         // метод, прописания ошибок в fetch
         .catch(error => {
              alert('Ошибка запроса!')  
         })

}


fetchMovieDetails();




const renderSearchMovie = (data) => {
    let movieDetailsHTML = '';

    movieDetailsHTML += `
        <div class="details__container">
            <div  class='details' >
                <img  class='details__image' src='${data.Poster}' alt='${data.Title}'>
            </div>
            <div  class='details' >

            <h1 class='details__title' >${data.Title}</h1>
                 <p class='details__info' >Year:<span class="details__value" >${data.Year}</span></p>
                <p  class='details__info' >Rated: <span class="details__value" >${data.Rated}</span></p>
                <p class='details__info' >Released: <span class="details__value" >${data.Released}</span></p>
                <p  class='details__info' >Runtime: <span class="details__value">${data.Runtime}</span></p>
                <p  class='details__info' >Genre: <span class="details__value">${data.Genre}</span></p>
                <p  class='details__info' >Director: <span class="details__value">${data.Director}</span></p>
                <p class='details__info' >Writer: <span class="details__value">${data.Writer}</span></p>
                <p  class='details__info' >Actors: <span class="details__value">${data.Actors}</span></p>
            </div>
        </div>

        <div class='about__container' >
            <p class='about__paragraph' >${data.Plot}</p>
        </div>
    `;

    // Вставка полученного HTML на саму страницу
    movieDetails.innerHTML += movieDetailsHTML;
};