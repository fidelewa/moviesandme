const API_TOKEN = "2b0bd94adbf7a5460b78682538002864";

// Le mot clé "export" permet de pouvoir utiliser cette méthode dans d'autres fichiers de l'application
export function getFilmsFromApiWithSearchedText(text, page) {
    
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page;
    // const uri = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text;
    
    return fetch(url)
        .then((response) => response.json())
        // .then(function(response) { //
        //     return response.json(); 
        //     /* La méthode json() retourne une promesse qui se tient en renvoyant 
        //     la réponse de la requête au format JSON.*/
        // })
        .catch((error) => console.error(error));
        // .catch(function(error) 
        //     console.error(error);
        // })

}

// Lien de téléchargement des affiches des films
export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
    }

// Récupération du détail d'un film
export function getFilmDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN +
    '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
    }