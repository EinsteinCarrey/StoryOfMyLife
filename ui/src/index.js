import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/styler.css';
import './assets/customJS';
import registerServiceWorker from './registerServiceWorker';
import {MuiThemeProvider, createMuiTheme} from "material-ui";
import Homepage from './components/index';
import {Provider} from 'react-redux';
import store from "./store";
import { BrowserRouter as Router, Route } from 'react-router-dom';

const theme = createMuiTheme();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Homepage {...this.props}/>
            </MuiThemeProvider>
        );
    }
}


/* connect component to store */
const connectedComponents =
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/:storyRef" component={App} />
            </div>
        </Router>
    </Provider>;


ReactDOM.render(connectedComponents, document.getElementById('root'));
registerServiceWorker();
