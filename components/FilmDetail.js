import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import numeral from 'numeral'
import moment from 'moment'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
        isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    componentDidMount() {
        // console.log("Component FilmDetail monté")
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
            film: data, // Récupération des détails/infos du film et stockage dans le state
            isLoading: false // Une fois qu'on a les infos du film, on fait disparaitre le chargement
            })
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
        // Si isLoading vaut true, on affiche le chargement à l'écran
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' />
            </View>
            )
        }
    }

    _displayFilm() {
        const { film } = this.state
        if (film != undefined) { // Si les infos du film sont disponibles
            return ( // On affiche notre ScrollView
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        // source={{uri: getImageFromApi(this.state.film.poster_path)}}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                        // source={{uri: getImageFromApi(this.state.film.belongs_to_collection.backdrop_path)}}
                    />
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{film.title}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={13}>
                            {film.overview}
                        </Text>
                    </View>
                    <View style={styles.infosfilm_container}>
                        <Text style={styles.infosfilm_text}>
                            Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
                        </Text>
                        <Text style={styles.infosfilm_text}>Note : {film.vote_average} / 10</Text>
                        <Text style={styles.infosfilm_text}>Nombre de votes : {film.vote_count}</Text>
                        {/* <Text style={styles.infosfilm_text}>Budget : {numeral(film.budget).format('0,0')} $</Text> */}
                        <Text style={styles.infosfilm_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                        <Text style={styles.infosfilm_text}>
                            Genre(s) : {film.genres.map(function(genre){
                                return genre.name;
                            }).join(" / ")}
                        </Text>
                        <Text style={styles.infosfilm_text}>
                            Companie(s) : {film.production_companies.map(function(company){
                                return company.name;
                            }).join(" / ")}
                        </Text>
                    </View>
                    {/* Pour l'instant je n'affiche que le titre, je vous laisserais le soin de créer la vue.
                    Après tout vous êtes aussi là pour ça non ? :)*/}
                </ScrollView>
            )
        }
    }

    render() {
        // console.log(this.props.navigation)
        // console.log("Component FilmDetail rendu")
        console.log(this.state)
        return (
            <View style={styles.main_container}>
                {/* <Text>Détail du film {this.props.navigation.state.params.idFilm}</Text> */}
                {/* <Text>Détail du film {this.props.navigation.getParam('idFilm')}</Text> */}
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 140,
        // borderWidth:1
    },
    header_container: {
        // borderWidth:1,
        alignItems: 'center'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
        // borderWidth:1
    },
    description_container: {
        // borderWidth:1
        paddingBottom: 10
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        padding: 5
    },
    infosfilm_container: {
        // borderWidth:1
        padding: 5
    },
    infosfilm_text: {
        fontWeight: 'bold',
        fontSize: 12,
    },
})

export default FilmDetail