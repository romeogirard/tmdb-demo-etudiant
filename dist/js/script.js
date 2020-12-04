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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG5cclxuICAgIGlmKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNlYXJjaChcImZpY2hlLWZpbG0uaHRtbFwiKSA+IDApe1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSAoIG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pICkuc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlSW5mb0ZpbG0oIHBhcmFtcy5nZXQoXCJpZFwiKSApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNsYXNzIE1vdmllREJ7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnN0cnVjdGV1clwiKTtcclxuICAgICAgICB0aGlzLkFQSWtleSA9IFwiZDQyZTVmOTY0Yzc2ZGE5YmVjMmNjNzI1ZTAyYTcyMTBcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVVJMID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zXCI7XHJcbiAgICAgICAgdGhpcy5pbWdQYXRoID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9cIjtcclxuICAgICAgICB0aGlzLnRvdGFsRmlsbSA9IDg7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZURlcm5pZXJGaWxtKCl7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUmVxdWV0ZURlcm5pZXJGaWxtLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAvL3JlcXVldGUub3BlbihcIkdFVFwiLCBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT1kNDJlNWY5NjRjNzZkYTliZWMyY2M3MjVlMDJhNzIxMCZsYW5ndWFnZT1mciZwYWdlPTFcIik7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVSTCArIFwiL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9XCIgKyB0aGlzLkFQSWtleSArIFwiJmxhbmd1YWdlPVwiICsgdGhpcy5sYW5nICsgXCImcGFnZT0xXCIpO1xyXG5cclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJSZXF1ZXRlRGVybmllckZpbG0oZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXRvdXIgZGVybmllciBmaWxtXCIpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBsZXQgZGF0YTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlRGVybmllckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZURlcm5pZXJGaWxtKGRhdGEpe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdW5BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT5hcnRpY2xlLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJQYXMgZGUgZGVzY3JpcHRpb25cIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgdW5lSW1hZ2UgPSB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuXHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG5cclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlSW5mb0ZpbG0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHJlcXVldGUub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVUkwgKyBcIi9tb3ZpZS9cIiArIG1vdmllSWQgKyBcIj9hcGlfa2V5PVwiICsgdGhpcy5BUElrZXkgKyBcIiZsYW5ndWFnZT1cIiArIHRoaXMubGFuZyk7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS97bW92aWVfaWR9P2FwaV9rZXk9PDxhcGlfa2V5Pj4mbGFuZ3VhZ2U9ZW4tVVNcclxuXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZUluZm9GaWxtKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmV0b3VyIGluZm8gZmlsbVwiKTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuXHJcbiAgICAgICAgbGV0IGRhdGE7XHJcblxyXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICB0aGlzLmFmZmljaGVJbmZvRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlSW5mb0ZpbG0oZGF0YSl7XHJcbiAgICAgICAgLypmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7XHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlPmFydGljbGUuZmlsbVwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJQYXMgZGUgZGVzY3JpcHRpb25cIjtcclxuICAgICAgICAgICAgbGV0IHNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzE4NVwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgbGV0IHVuZUltYWdlID0gdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YVtpXS50aXRsZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIikuYXBwZW5kQ2hpbGQodW5BcnRpY2xlKTtcclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkKTtcclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgdGhpcy5yZXF1ZXRlQWN0ZXVyKGRhdGEuaWQpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZmZpY2hlXCIpLnNldEF0dHJpYnV0ZShcInNyY1wiLCB0aGlzLmltZ1BhdGggKyBcIncxMjgwXCIgKyBkYXRhLmJhY2tkcm9wX3BhdGgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWZmaWNoZVwiKS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YS50aXRsZSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGF0YS5vdmVydmlldztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVxdWV0ZUFjdGV1cihtb3ZpZUlkKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlQWN0ZXVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVVJMICsgXCIvbW92aWUvXCIgKyBtb3ZpZUlkICsgXCIvY3JlZGl0cz9hcGlfa2V5PVwiICsgdGhpcy5BUElrZXkgKyBcIiZsYW5ndWFnZT1cIiArIHRoaXMubGFuZyk7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS97bW92aWVfaWR9L2NyZWRpdHM/YXBpX2tleT08PGFwaV9rZXk+PiZsYW5ndWFnZT1lbi1VU1xyXG5cclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJSZXF1ZXRlQWN0ZXVyKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmV0b3VyIGFjdGV1ciBmaWxtXCIpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBsZXQgZGF0YTtcclxuXHJcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWZmaWNoZUFjdGV1cihkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlQWN0ZXVyKGRhdGEpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7XHJcbiAgICAgICAgICAgIGxldCB1bkFjdGV1ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGU+YXJ0aWNsZS5hY3RldXJcIikuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICB1bkFjdGV1ci5xdWVyeVNlbGVjdG9yKFwiaDNcIikuaW5uZXJIVE1MID0gZGF0YVtpXS5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
