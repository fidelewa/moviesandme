import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native'
// import films from '../helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' 
// import { } from ... car c'est un export nommé dans TMDBApi.js

class Search extends React.Component {

    constructor() {
        // Fait appel au constructeur de la classe Component parente
        super() 
        // this._films = []
        
        this.state = { 
            filmms: [],
            isLoading: false 
            // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
        }
        
        this._searchedText= "" // Initialisation de notre donnée searchedText dans le state
        this.page = 0 // Compteur pour connaître la page courante
        this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    }

    _searchTextInputChanged(text) {
        // this.setState({ searchedText: text })
        this._searchedText = text 
        // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
        }

    // action ou méthode magique ou procédure évènnementielle 
    // qui est une méthode privé compte tenu du underscore (_)
    _loadFilms() {
        // getFilmsFromApiWithSearchedText("star").then(data => console.log(data));
        // Si cette fonction retourne une réponse, alors le résultat ou
        // ou les données de cette reponse sont affichés dans la console c-a-d le terminal ou cli
        // getFilmsFromApiWithSearchedText("star").then(data => {
            // this._films = data.results
            // this.forceUpdate()
            // this.setState({ filmms: data.results})
            // le setter setState permet de signaler à React que l'état du component Search à changé
            // et qu'il doit être réinitialisé dans son nouvel état
        // })
        // Quand on clique sur le bouton "rechercher" une liste de films est récupérée sur le web
        // via l'API TMDB et affiché dans la Flatlist (liste de données)

        // console.log(this.state.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
        // console.log(this._searchedText)
        // if (this.state.searchedText.length > 0) { 
        if (this._searchedText.length > 0) {
            this.setState({ isLoading: true }) // Lancement du chargement
            // On récupère la valeur de la propriété searchedText du state 
            // Seulement si le texte recherché n'est pas (la propriété searchedText contient au moins un caractère)
        // getFilmsFromApiWithSearchedText(this.state.searchedText).then(data => {
        getFilmsFromApiWithSearchedText(this._searchedText, this.page+1).then(data => {
            // this.page+1, incémentation de 1 de la valeur de la page courante.
            this.page = data.page
            this.totalPages = data.total_pages
        this.setState({ 
            // filmms: data.results,
            // filmms: [ ...this.state.filmms, ...data.results ],
            filmms: this.state.filmms.concat(data.results),
            // (une copie) Les nouveaux films qui ont été récupérés depuis l'API via l'entrée "results" du tableau "data", 
            // sont ajouté à (une copie) la liste des films courant de la Flatlist via la propriété "filmms" du state
            isLoading: false // Arrêt du chargement
            })
        })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) { // Si notre propriété de chargement vaut "true" on affiche l'activity indicator
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                    {/* Le component ActivityIndicator possède une propriété size pour définir la taille du
                    visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le
                    chargement soit bien visible */}
                </View>
                // Cette vue sans style "flex" ni "height" dépend entièrement 
                // de la taille de son component enfant à savoir "ActivityIndicator".
            )
        }
    }

    // _searchFilms() {
    //     this.page = 0
    //     this.totalPages = 0
    //     this.setState({
    //       filmms: [] // Ici on va remettre à zéro les films de notre state
    //     })
    //     // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
    //     console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.filmms.length)
      
    //     this._loadFilms()
    //     // Dans ce cas, la fonction loadFilms() s'exécute avant même que le 
    //     // setState ait fini de remettre à zéro nos films
    //   }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          filmms: [],
        }, () => { 
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.filmms.length)
            this._loadFilms() 
            // Cette fois, on lance bien notre recherche de nouveaux films this.loadFilms() seulement lorsque
        // setState a fini de remettre à zéro nos films.
        })
    }
    
    render() {
        // Ici on rend à l'écran les éléments graphiques de notre component custom Search
        // console.log("RENDER")
        console.log(this.state.isLoading)
        return (
            <View style={styles.main_container}>
              <TextInput 
                style={[styles.textinput, { marginBottom: 10 }]} 
                placeholder='Titre du film'
                onChangeText={(text) => this._searchTextInputChanged(text)}
                // Pendant que l'on saisi un texte dans le TextInput, ce texte est transmit à la méthode _loadFilms()
                // qui va définir la valeur de la propriété searchedText se trouvant dans le state
                onSubmitEditing={() => this._searchFilms()}
                // Cette props (évènement) va permettre de valider la recherche du texte saisi 
                // dans le TextInput en appuyant sur la touche Entrée du clavier tactile du téléphone.
              />
              <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._searchFilms()}/>
              {/* <Button style={{ height: 50 }} title='Rechercher' onPress={function() {return this._loadFilms()} }/> */}
              {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
              <FlatList
                // Tableau ou liste de films affichés dans la Flatlist
                // data={this._films}
                data={this.state.filmms}
                // Donc ici on choisi la propriété id comme la clé des éléménts films
                keyExtractor={(item) => item.id.toString()} 
                // keyExtrator = {function ({item}) {return item.id.toString()}}
                renderItem={({item}) => <FilmItem filmm={item}/>}
                // Donc ici en réalité, on instancie le constructeur implicite de la classe FilmItem
                // en affichant l'élément film courant de la props filmm
                // Grâce à l'ajout de cette prop, on fait passer l'item en cours (un film) 
                // aux components custom FilmItem de notre FlatList (liste de données).
                // renderItem={function ({item}) { return <FilmItem/> }}
                onEndReachedThreshold={0.5} // propriété permettant de définir quand l'évènement onEndReached est appelé.
                // ici lorsqu'on atteint 50% de la longeur de la FlatList
                onEndReached={() => {
                    // if(this.state.filmms.length > 0) {
                    //     // si le nombre de film dans notre FlatList est supérieur à 0 alors
                    //     console.log("onEndReached")
                    // }
                    if (this.state.filmms.length > 0 && this.page < this.totalPages) { 
                        // On vérifie qu'on a au moins 1 film dans notre FlatList et
                        // qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                        this._loadFilms()
                    }
                }}

                // Cet évènement est déclenché lorsqu'il reste 
                // 50 pixels (soit la moitié) de la longeur de la Flatlist à afficher
              />
              {this._displayLoading()}
            </View>
          )
    }
}

const styles = StyleSheet.create({
    main_container:{
        marginTop: 20,
        flex:1
    },
    textinput : {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 0,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1
        }
})

export default Search