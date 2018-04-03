import React, { Component } from "react";
import Character from "./components/Character";
import { EventEmitter } from "events";
// import ListWrapper from '../utils/ListWrapper';
import { List } from "material-ui/List";

import MarvelAPI from "../../../services/marvel";
 

class CharactersSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      favorites: [],
      mounted: false
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  // setCharactersData() {
  //   return this.state.characters.length === 0
  //     ? MarvelAPI.getCharacters()
  //         .then(data => {
  //           console.log(data);
  //           this.setState({
  //             characters: data.data.data.results,
  //             mounted: true
  //           });
  //         })
  //         .catch(err => {
  //           console.log(err);
  //           return err;
  //         })
  //     : () => {
  //         return;
  //     };
  // }

  componentWillMount() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.addListener("toggleFavorite", ({ newFavorite }) => {
      this.toggleFavorite(newFavorite);
    });
    return this.state.characters.length === 0
      ? MarvelAPI.getEntity('characters')
          .then(data => {
            console.log(data);
            this.setState({
              characters: data.data.data.results,
              mounted: true
            });
          })
          .catch(err => {
            console.log(err);
            return err;
          })
      : () => {
          return;
      };
  }

  toggleFavorite(newFavorite) {
    return this.getFavIndex(newFavorite) !== -1
      ? this.removeFavorite(newFavorite)
      : this.addFavorite(newFavorite);
  }

  addFavorite(newFavorite) {
    if (this.state.favorites.length >= 5) {
      return;
    }
    let newFavState = this.state.favorites;
    newFavState = newFavState.concat(newFavorite);
    return this.setState({
      favorites: newFavState
    });
  }

  removeFavorite(newFavorite) {
    let index = this.getFavIndex(newFavorite);
    let lessFavState = this.state.favorites;
    lessFavState.splice(index, 1);
    return this.setState({ favorites: lessFavState });
  }

  getFavIndex(newFavorite) {
    return this.state.favorites.indexOf(newFavorite);
  }

  renderCharacters(characters) {
    return Object.values(characters).map((character, index) => {
      return (
        <Character
          eventEmitter={this.eventEmitter}
          key={index}
          getFavIndex={this.getFavIndex.bind(this)}
          character={character}
          favorites={this.state.favorites}
          id={character.id}
          name={character.name}
          description={character.description}
          avatar={
            character.thumbnail.path + "." + character.thumbnail.extension
          }
          desktop={
            character.thumbnail.path +
            "/landscape_xlarge." +
            character.thumbnail.extension
          }
          mobile={
            character.thumbnail.path +
            "/standard_fantastic." +
            character.thumbnail.extension
          }
          apparitionNumber={character.comics.available}
          firstThreeComicsApparitions={character.comics.items.splice(0, 3)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.mounted ? (
          <div>
            <List></List>
            {/* <ListWrapper title="Favorites Characters"> */}
              {/* {this.renderCharacters(this.state.favorites)} */}
            {/* </ListWrapper> */}
            {/* <ListWrapper title="Marvel Characters"> */}
              {/* {this.renderCharacters(this.state.characters)} */}
            {/* </ListWrapper> */}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default CharactersSection;
