// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      filmms: [],
      isLoading: false
    }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text 
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
        this._loadFilms()
        // Cette fois, on lance bien notre recherche de nouveaux films this.loadFilms() seulement lorsque
        // setState a fini de remettre à zéro nos films.
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  // Cette méthode est une méthode magique ou procédure évènnementielle 
  // _displayDetailForFilm(idFilm) { console.log("Display film with id " + idFilm) }
  _displayDetailForFilm = (idFilm) => {
    // console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    // Cette prop objet "navigation" qui est créée par le StackNavigator est récupérée par notre component custom Search
    // et appelé dans la fonction _displayDetailForFilm()
    }

  render() {
    // console.log(this.state.isLoading)
    console.log(this.props)
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._searchFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem filmm={item} displayDetailForFilm={this._displayDetailForFilm}
          // Ici on fait passer la méthode displayDetailForFilm() au component FilmItem via la props displayDetailForFilm
          />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
              if (this.state.films.length > 0 && this.page < this.totalPages) { // On vérifie également qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                 this._loadFilms()
              }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    // marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    // borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search