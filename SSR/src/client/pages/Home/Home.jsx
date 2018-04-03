import React from "react";
import "./Home.css";
import CharactersSection from '../../components/Characters/CharactersSection';
// import IconButton from "material-ui/IconButton";
// import { Link } from "react-router-dom";



class Home extends React.Component {

  isMobile() {
    return window.innerWidth > 700 ? false : true;
  }

  render() {
    return (
        <div className="Home">
        <div>
          {/* <Link to='/favorites'>
          <IconButton iconStyle={{color:'white'}} >
            <i className="material-icons md-light">star_rate</i>
          </IconButton>
          </Link> */}
        </div>
          
          
          <main >
            <CharactersSection isMobile={this.isMobile} />
          </main>
          <footer>
            <small>Data provided by Marvel. © 2014 Marvel</small>
          </footer>
        </div>
    );
  }
}

export default Home;
