import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { ListItem } from "material-ui/List";
import { Card, CardMedia, CardTitle } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";

const BasicCharacterItem = props => {
  return (
    <ListItem
      primaryText={props.name}
      leftAvatar={<Avatar src={props.avatar} />}
      rightIconButton={
        <IconButton
          onClick={e =>
            props.eventEmitter.emit("toggleFavorite", {
              newFavorite: props.character
            })
          }
          iconStyle={{
            width: "20px",
            color: props.getFavIndex(props.character) !== -1 ? "yellow" : "grey"
          }}
        >
          <FontIcon className="material-icons">star_rate</FontIcon>
        </IconButton>
      }
      onClick={e => props.toggleDialog(e)}
    />
  );
};
const CharacterDialogDetails = props => {
  return (
    <Dialog
      title="Character Details"
      modal={false}
      open={props.isOpen}
      onRequestClose={e => props.toggleDialog(e)}
      autoScrollBodyContent={true}
      contentStyle={
        props.isMobile()
          ? { width: "100%", maxWidth: "70%", margin: "0 4.5%" }
          : { width: "90%", maxWidth: "none" }
      }
    >
      <Card>
        <CardTitle
          title={props.name}
          subtitle={
            <FontIcon
              className="material-icons"
              style={{
                color:
                  props.getFavIndex(props.character) !== -1 ? "yellow" : "grey"
              }}
            >
              star_rate
            </FontIcon>
          }
        />
        <CardMedia>
          <div
            style={
              !props.isMobile()
                ? { display: "inline-flex" }
                : { display: "block", textAlign: "center" }
            }
          >
            <img
              src={props.isMobile() ? props.mobile : props.desktop}
              alt={props.name}
            />
            <div style={{ margin: "0 2.5%", textAlign: "left" }}>
              <div>
                <h4>Description</h4>
                <p>{props.description}</p>
              </div>
              <div>
                <p>Appeared in {props.apparitionNumber} comics</p>
                <h4>First apparitions</h4>
                <ul style={{ listStyle: "none" }}>
                  {Object.values(props.firstThreeComicsApparitions).map(
                    (comic, index) => {
                      return (
                        <li key={index}>
                          <a
                            style={{
                              textDecoration: "none",
                              color: "orangered"
                            }}
                            href={comic.resourceURI}
                          >
                            {comic.name}
                          </a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </CardMedia>
      </Card>
    </Dialog>
  );
};

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog(e) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      id,
      name,
      avatar,
      description,
      apparitionNumber,
      firstThreeComicsApparitions,
      desktop,
      mobile,
      character,
      getFavIndex
    } = this.props;

    return (
      <div>
        <BasicCharacterItem
          id={id}
          eventEmitter={this.props.eventEmitter}
          getFavIndex={getFavIndex}
          character={character}
          name={name}
          avatar={avatar}
          toggleDialog={this.toggleDialog}
        />
        <CharacterDialogDetails
          id={id}
          eventEmitter={this.props.eventEmitter}
          getFavIndex={getFavIndex}
          isOpen={this.state.isOpen}
          character={character}
          name={name}
          avatar={avatar}
          description={description}
          toggleDialog={this.toggleDialog}
          isMobile={this.props.isMobile}
          mobile={mobile}
          desktop={desktop}
          firstThreeComicsApparitions={firstThreeComicsApparitions}
          apparitionNumber={apparitionNumber}
        />
      </div>
    );
  }
}

export default Character;
