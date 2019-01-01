// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class FilmItem extends React.Component {
  render() {
    return ( // mix de style externalisé et de style direct
      <View style={[styles.main_container, {flex: 1, flexDirection: 'row', marginTop: 10, borderWidth:1}]}> 
        <View style={{flex: 1, backgroundColor: '#EEEEEE', margin: 5}}>
            <Text>Image du film (image)</Text>
        </View>
        <View style={{flex: 2, padding: 5}}>
            <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
                <View style={{flex: 2}}>
                    <Text style={styles.title_text}>Titre du film</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text>Vote</Text>
                </View>
            </View>
            <View style={{flex: 2, marginBottom: 5}}>
                <Text>Description</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>Sorti le 00/00/0000</Text>
            </View>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190
  },
  title_text: {
    
  }
})

export default FilmItem