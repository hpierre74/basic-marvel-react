import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { ListItem } from "material-ui/List";
import { Card, CardMedia, CardTitle } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import IconButton from 'material-ui/IconButton';

const BasicCharacterItem = props => {
  return (
    <ListItem
      primaryText={
        <div onClick={e => props.toggleDialog(e)}> {props.name} </div>
      }
      leftAvatar={<Avatar src={props.avatar} />}
      rightIconButton={
          <IconButton 
            onClick={e => props.eventEmitter.emit("toggleFavorite", {newFavorite: props.character})}
            iconStyle={{ width:'20px',color: props.getFavIndex(props.character) !== -1 ? "yellow" : "grey" }}
          >
            <i
              className="material-icons"
            >
              star_rate
            </i> 
          </IconButton>
      }
      onClick={e => props.toggleDialog(e)}
    />
  );
};
const CharacterDialogDetails = props => {
  return(
    <Dialog
      title="Character Details"
      modal={false}
      open={props.isOpen}
      onRequestClose={e => props.toggleDialog(e)}
      autoScrollBodyContent={true}
    >
      <Card>
        <CardTitle
          title={props.name}
          subtitle={
          <i
            className="material-icons"
            style={{ color: props.getFavIndex(props.character) !== -1 ? "yellow" : "grey" }}
          >
            star_rate
          </i>
          }
        />
        <CardMedia>
          <div
            style={
              !props.isMobile()
                ? { display: "inline-flex", margin:' 0 2.5% 2.5%' }
                : { display: "block", textAlign: "center" }
            }
          >
            <img src={props.isMobile() ? props.mobile : props.desktop} alt={props.name} />
            <div style={{ margin: "0 2.5%", textAlign: "left" }}>
              <div>
                <h4>Description</h4>
                <p>{props.description}</p>
              </div>
              <div>
                <h4>Apparitions</h4>
                <p>Appeared in {props.apparitionNumber} comics</p>
                <h6>First apparitions</h6>
                <ul>
                  {props.firstThreeComicsApparitions.forEach(comic => {
                    console.log({ [props.name] :comic.name});
                    return <li>{comic.name}</li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </CardMedia>
      </Card>
    </Dialog>
  )
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

  isMobile() {
    return window.innerWidth > 700 ? false : true;
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
          isMobile={this.isMobile}
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
