import React from 'react';
import Search from './components/Search';

export default class App extends React.Component {
  render() {
    return (
      <Search/>
      // Instanciation du component customs Search
      // Quand le component custom Search est initialisé ou instancié, 
      // le Flatlist n'affiche aucune donnée car la liste des films est vide
    );
  }
}