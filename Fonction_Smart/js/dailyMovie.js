//liste des id des 30 films initiaux
var dailyMovie = ['tt0112384', 'tt1213641', 'tt1182345', 'tt7488208', 'tt0079574', 'tt0082010', 'tt0082533', 'tt2393827', 'tt0096764', 'tt0320691', 'tt5480782', 'tt0062622', 'tt0780653', 'tt1099212', 'tt2935510', 'tt0304141', 'tt0125664', 'tt0099827', 'tt4975722', 'tt1748122', 'tt3659388', 'tt0312004', 'tt4846340', 'tt1454468', 'tt0816692', 'tt0448134', 'tt0062827', 'tt0053072', 'tt0482603', 'tt0186566', 'tt0338526'];

//fonction d'obtention du jour actuel pour sélectionner le bon id
var date = new Date();
var jour = date.getDate();
var filmDuJour = dailyMovie[jour-1];

//mise en place d'une liste dans le stockage local
movieList = localStorage;

console.log(jour);
console.log(filmDuJour);

getMovie(filmDuJour);

//fonction qui permet d'obtenir les détails sur le film du jour
function getMovie(idFilmDuJour){

    console.log(idFilmDuJour);
  
    //requête vers l'API
    axios.request({
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
        params: {tconst:idFilmDuJour, currentCountry: 'US'},
        headers: {
          'x-rapidapi-key': '3d1de671d0mshcd7c4f21da3d565p194067jsn03cba614409e',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'}
    })
  
    .then(function (response) {

      //affichage du contenu de la réponse json
      console.log(response.data);

      dataFilm = response.data;
      var output = '';
  
      titreFilm = dataFilm.title.title;
      poster = dataFilm.title.image.url;

      localStorage.setItem('movieIdCurrent', idFilmDuJour);

      //mise en forme en HTML des éléments de sortie
      output += `
      <div class="affiche">
        <div class="well text-center">
          <img src="${poster}" class="well">
          <h4>${titreFilm}</h4>
          <a onclick="movieDetails('${idFilmDuJour}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
      `
    ;
  
  $('#movie').html(output);

})
    .catch(function (error) {
        console.error(error);
    });
}



//fonction de redirection vers movieDetails lors d'un appui sur le bouton
function movieDetails(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movieDetails.html';

  console.log('Movie selected');
  getMovieDetails();
  return false;
}



//fonction d'obtention des informations dans l'onglet movieDetails
function getMovieDetails(){
  
  var idF = sessionStorage.getItem('movieId');
  console.log(idF);

  axios.request({
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
    params: {tconst:idF, currentCountry: 'US'},
    headers: {
      'x-rapidapi-key': '3d1de671d0mshcd7c4f21da3d565p194067jsn03cba614409e',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'}
  })

  .then(function (response) {
  console.log(response.data);

  var movie = response.data;
  var output = '';

  output += `
  <div class="row">
    <div class="col-md-4">
      <img src="${movie.title.image.url}" class="thumbnail">
    </div>
    <div class="col-md-8">
      <h2>${movie.title.title}</h2>
      <ul class="list-group">
        <li class="list-group-item"><strong>Genres:</strong> ${movie.genres}</li>
        <li class="list-group-item"><strong>Realeased:</strong> ${movie.title.year}</li>
        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.ratings.rating}</li>
        <h2></h2>
        <li class="list-group-item"><strong>Plot:</strong> ${movie.plotOutline.text}</li>
        <a href="dailyMovie.html" class="btn btn-primary">Go back</a>
      </ul>
    </div>
  </div>
`;

$('#movies').html(output);

})
.catch(function (error) {
    console.error(error);
});
}



//fonction de conservation de l'identifiant du film liké
function likeId(){
  var likeId = dailyMovie[jour-1];
  sessionStorage.setItem('likeId', likeId);

  like(likeId);
  return false;
}



//fonction de like pour obtenir un film correspondant
function like(id){
  console.log("LIKE");
  sessionStorage.setItem('movieIdLike', id);

  var movieId = sessionStorage.getItem('movieIdLike');
  console.log(movieId);

  axios.request({
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-more-like-this',
    params: {tconst:movieId, currentCountry: 'US', purchaseCountry: 'US'},
    headers: {
      'x-rapidapi-key': '3d1de671d0mshcd7c4f21da3d565p194067jsn03cba614409e',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    }})  
  
  .then(function (response) {
    var idMatch = response.data;
    console.log(idMatch);

    var filmTrouve=true;
    var i=0;
    var j=0;

    while(filmTrouve==true){

      idFilmMatch=idMatch[i].substring(7,16);

      console.log(idFilmMatch);

      axios.request({
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
        params: {tconst:idFilmMatch, currentCountry: 'US'},
        headers: {
          'x-rapidapi-key': '3d1de671d0mshcd7c4f21da3d565p194067jsn03cba614409e',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'}
      })
    
      .then(function (response) {
    
        dataFilmMatch = response.data;
    
        console.log(dataFilmMatch);
    
        if('title' in dataFilmMatch){
          console.log("title dans film");
          titreFilm = dataFilmMatch.title.title;
          console.log(titreFilm);

          filmTrouve = false;
          j=1;
        }
        else{
          console.log("pas valide");
        }
  
      })
      .catch(function (error) {
          console.error(error);
      });

      if(j>0)
      {
        filmTrouve=false;
      }
      if(i>3){
        filmTrouve=false;
      }

      console.log(i);
      i=i+1;
    }

  }).catch(function (error) {
    console.error(error);
  });

  return false;
}




//fonction de stockage du film dislike dans la "banList"
function dislike(){
  console.log("DISLIKE");
  console.log(filmDuJour);
  movieList.setItem('ban' + filmDuJour, filmDuJour);

  var banTest = movieList.getItem('ban' + filmDuJour);
  console.log(banTest);

  return false;
}




//fonction d'ajout à la watchlist
function watchlist(){
  console.log("WATCHLIST");

  movieList.setItem('watchlist' + filmDuJour, filmDuJour);

  var watchTest = movieList.getItem('watchlist' + filmDuJour);
  console.log(watchTest);
  return false;
}




//fonction de vérification de la validité du film sur plusieurs critères :
//  titre existant
//  poster existant
//  type = film
function validMovie(id){
  console.log(id);

  axios.request({
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
    params: {tconst:id, currentCountry: 'US'},
    headers: {
      'x-rapidapi-key': '3d1de671d0mshcd7c4f21da3d565p194067jsn03cba614409e',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'}
  })

  .then(function (response) {

    dataFilmMatch = response.data;

    console.log(dataFilmMatch);

    if('title' in dataFilmMatch){
      console.log("title dans film");
      titreFilm = dataFilmMatch.title.title;
      console.log(titreFilm);
      filmTrouve = 1;
    }
    else{
      console.log("pas valide");
    }

    if(filmTrouve == 1){
      console.log("c'est good");
    }

    })
    .catch(function (error) {
        console.error(error);
    });
}