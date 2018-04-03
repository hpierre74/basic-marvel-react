import React, { Component } from 'react';
import { List } from "material-ui/List";



class ListWrapper extends Component {
    render() {
      return (
        <div>
          <h4>{this.props.title}</h4>
          <List>{this.props.children}</List>
        </div>
      );
    }
  }

  export default ListWrapper;