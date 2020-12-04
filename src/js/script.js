document.addEventListener("DOMContentLoaded", function(){
    let connexion = new MovieDB();

    if(document.location.pathname.search("fiche-film.html") > 0){
        let params = ( new URL(document.location) ).searchParams;
        connexion.requeteInfoFilm( params.get("id") );
    }else{
        connexion.requeteDernierFilm();
    }
});

class MovieDB{
    constructor() {
        console.log("Constructeur");
        this.APIkey = "d42e5f964c76da9bec2cc725e02a7210";
        this.lang = "fr";
        this.baseURL = "https://api.themoviedb.org/3";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 8;
    }

    requeteDernierFilm(){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));

        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=d42e5f964c76da9bec2cc725e02a7210&language=fr&page=1");
        requete.open("GET", this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

        requete.send();
    }

    retourRequeteDernierFilm(e){
        console.log("Retour dernier film");

        let target = e.currentTarget;

        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;
        console.log(data);

        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data){
        for (var i = 0; i < data.length; i++) {

            console.log(data[i].title);

            let unArticle = document.querySelector(".template>article.film").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = data[i].title;

            unArticle.querySelector("p.description").innerHTML = data[i].overview || "Pas de description";

            let src = this.imgPath + "w185" + data[i].poster_path;

            let uneImage = unArticle.querySelector("img");

            uneImage.setAttribute("src", src);

            uneImage.setAttribute("alt", data[i].title);

            document.querySelector(".liste-films").appendChild(unArticle);

            unArticle.querySelector("a").setAttribute("href", "fiche-film.html?id=" + data[i].id);
        }
    }








    requeteInfoFilm(movieId){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));

        requete.open("GET", this.baseURL + "/movie/" + movieId + "?api_key=" + this.APIkey + "&language=" + this.lang);
        // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

        requete.send();
    }

    retourRequeteInfoFilm(e){
        console.log("Retour info film");

        let target = e.currentTarget;

        let data;

        data = JSON.parse(target.responseText);

        this.afficheInfoFilm(data);
    }

    afficheInfoFilm(data){
        /*for (var i = 0; i < data.length; i++) {
            console.log(data[i].title);
            let unArticle = document.querySelector(".template>article.film").cloneNode(true);
            unArticle.querySelector("h2").innerHTML = data[i].title;
            unArticle.querySelector("p.description").innerHTML = data[i].overview || "Pas de description";
            let src = this.imgPath + "w185" + data[i].poster_path;
            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);
            document.querySelector(".liste-films").appendChild(unArticle);
            unArticle.querySelector("a").setAttribute("href", "fiche-film.html?id=" + data[i].id);
        }*/

        this.requeteActeur(data.id);

        document.querySelector("h1").innerHTML = data.title;

        document.querySelector(".affiche").setAttribute("src", this.imgPath + "w1280" + data.backdrop_path);
        document.querySelector(".affiche").setAttribute("alt", data.title);

        document.querySelector(".description").innerHTML = data.overview;
    }


    requeteActeur(movieId){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourRequeteActeur.bind(this));

        requete.open("GET", this.baseURL + "/movie/" + movieId + "/credits?api_key=" + this.APIkey + "&language=" + this.lang);
        // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

        requete.send();
    }

    retourRequeteActeur(e){
        console.log("Retour acteur film");

        let target = e.currentTarget;

        let data;

        data = JSON.parse(target.responseText);

        this.afficheActeur(data);
    }

    afficheActeur(data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].title);
            let unActeur = document.querySelector(".template>article.acteur").cloneNode(true);
            unActeur.querySelector("h3").innerHTML = data[i].name;
        }
    }

}