import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/styler.css';
import './assets/customJS';
import registerServiceWorker from './registerServiceWorker';
import {MuiThemeProvider} from "material-ui";
import Homepage from './components/homepage';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Homepage />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
