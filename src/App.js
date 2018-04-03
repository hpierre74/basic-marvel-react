import React, { Component } from "react";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import CharactersSection from "./components/Characters/CharactersSection";
import "./App.css";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div className="App">         
                <header>
                    <h2>Test Peaks</h2>
                </header>
                <CharactersSection />
                <footer style={{ margin: "2.5% auto" }}>
                    Data provided by Marvel. © 2014 Marvel
                </footer>
            </div>
            </MuiThemeProvider>

        );
    }
}
export default App;
