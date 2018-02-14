import React, { Component } from 'react';
import Banner from "./banner";
import StoriesDashBoard from "./storiesDashBoard";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {fetchStories} from '../actions/storiesActions';
import Loader from "./loader";


class Homepage extends Component {
    state = {
        stories:this.props.stories,
        loading: false,
        query: 'progress',
        placeholder: {
            height: 40,
        }
    };

    componentDidMount(){
        this.props.fetchStories();
    }

    componentWillReceiveProps(nextProps) {

        /* Update the stories dashboard */
        if(this.state.stories !== nextProps.stories) {
            this.setState({
                stories: nextProps.stories
            });
        }
    }

    handleClickQuery = () => {
        clearTimeout(this.timer);

        if (this.state.query !== 'idle') {
            this.setState({
                query: 'idle',
            });
            return;
        }

        this.setState({
            query: 'progress',
        });
        this.timer = setTimeout(() => {
            this.setState({
                query: 'success',
            });
        }, 2e3);
    };

    render() {
        const {stories, query, placeholder} = this.state;
        return (
            <div className="homepage">

                <Banner/>
                <Loader classes={placeholder} query={query}/>
                <StoriesDashBoard stories={stories}/>

            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        stories: state.stories
    }
};

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({ fetchStories}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);