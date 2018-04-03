import React, { Component } from "react";
import { List } from "material-ui/List";
import Paper from "material-ui/Paper";
import { Tabs, Tab } from "material-ui/Tabs";
import Character from "./components/Character";
import { EventEmitter } from "events";
import MarvelAPI from "../../services/marvel";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";

class ListWrapper extends Component {
    render() {
        return (
            <div>
                <List>{this.props.children}</List>
            </div>
        );
    }
}

class CharactersSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            favorites: [],
            config: {
                params: {
                    offset: 100
                }
            },
            previousOffset: "",
            maxOffset: 1500, //should be calculate from the length of the whole characters data saved in cache or db
            mounted: false
        };
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    isMobile() {
        return window.innerWidth > 700 ? false : true;
    }

    previous() {
        return this.setState(
            prevState => {
                prevState.config.params.offset =
                    prevState.config.params.offset !== 0
                        ? prevState.config.params.offset - 20
                        : 0;
            },
            () => {
                return this.setCharactersData(this.state.config);
            }
        );
    }
    next() {
        return this.setState(
            prevState => {
                prevState.config.params.offset =
                    prevState.config.params.offset !== prevState.maxOffset
                        ? prevState.config.params.offset + 20
                        : 0;
            },
            () => {
                return this.setCharactersData(this.state.config);
            }
        );
    }

    //set characters data from api on first mounting cycle
    setCharactersData(config) {
        return this.state.characters.length === 0 ||
            this.state.config.params.offset !== this.state.previousOffset
            ? MarvelAPI.getEntity("characters", config)
                  .then(data => {
                      this.setState({
                          characters: data.data.data.results,
                          mounted: true,
                          previousOffset: config.params.offset
                      });
                  })
                  .catch(err => {
                      alert('MarvelAPI call failed')
                      return err;
                  })
            : () => {
                  return;
              };
    }

    componentWillMount() {
        this.setCharactersData(this.state.config);
        //On "toggleFavorite" event emission, trigger function toggleFavorite
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.addListener("toggleFavorite", ({ newFavorite }) => {
            this.toggleFavorite(newFavorite);
        });
    }

    //Toggle Clicked Favorite Character from state
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
    // Loop through the characters and render each Character
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
                    isMobile={this.isMobile}
                    avatar={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
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
                    firstThreeComicsApparitions={character.comics.items.splice(
                        0,
                        3
                    )}
                />
            );
        });
    }

    render() {
        return (
            <div
                style={
                    this.isMobile()
                        ? { width: "100%", margin: "0 auto" }
                        : { width: "79%", margin: "2.5% auto" }
                }
            >
                {this.state.mounted ? (
                    <div>
                        <div>
                            <RaisedButton
                                label="prev"
                                onClick={e => this.previous(e)}
                            />
                            <RaisedButton
                                label="next"
                                onClick={e => this.next(e)}
                            />
                        </div>
                        <Tabs>
                            <Tab label="Marvel Characters">
                                <Paper zDepth={3}>
                                    <h4>
                                   { this.state.config.params.offset +
                                    " / " + (parseInt(this.state.config.params.offset,10) + 20)}
                                    </h4>
                                    <ListWrapper>
                                        {this.renderCharacters(
                                            this.state.characters
                                        )}
                                    </ListWrapper>
                                </Paper>
                            </Tab>
                            <Tab label="My Favorites">
                                <Paper zDepth={3}>
                                    <ListWrapper>
                                        {this.state.favorites.length !== 0 ? (
                                            this.renderCharacters(
                                                this.state.favorites
                                            )
                                        ) : (
                                            <p style={{ textAlign: "center" }}>
                                                <i>No Favorite yet</i>
                                            </p>
                                        )}
                                    </ListWrapper>
                                </Paper>
                            </Tab>
                        </Tabs>
                    </div>
                ) : (
                    <CircularProgress style={{ margin: "20%" }} />
                )}
            </div>
        );
    }
}

export default CharactersSection;
