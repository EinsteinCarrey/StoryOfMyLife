import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/styler.css';
import './assets/customJS';
import registerServiceWorker from './registerServiceWorker';
import {MuiThemeProvider, createMuiTheme} from "material-ui";
import Homepage from './components/index';
import {Provider} from 'react-redux';
import store from "./store";

const theme = createMuiTheme();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Homepage/>
            </MuiThemeProvider>
        );
    }
}


const connectedComponents =
    <Provider store={store}>
        <App/>
    </Provider>;

ReactDOM.render(connectedComponents, document.getElementById('root'));
registerServiceWorker();
