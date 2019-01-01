// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
  render() {
    // console.log(this.props)
    // console.log(this.props.filmm)

    // Donc ici "filmm" est une prop du component custom FilmItem 
    // défini dans le component custom Search
    // Néanmoins le component custom FilmItem ne peut qu'accéder à ce "prop"
    // qu'en lecture seule

    // const { filmm, displayDetailForFilm } = this.props

    const film = this.props.filmm
    const displayDetailForFilm = this.props.displayDetailForFilm
    // On récupère depuis la props la méthode displayDetailForFilm()

    return (
      <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}> 
      {/* On définit la props onPress sur notre View pour appeler notre fonction displayDetailForFilm 
        en faisant passer l'identifiant du film à la méthode
      */}
        <Image
          style={styles.image}
          // source={{uri: "image"}}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
    flex: 1,
    marginTop: 10, 
    // borderWidth: 1
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    // backgroundColor: 'gray',
  },
  content_container: {
    flex: 1,
    margin: 5,
    // flex: 2, 
    // padding: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
    // borderWidth:1
    // flex: 1, 
    // marginBottom: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7,
    // borderWidth:1
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default FilmItem