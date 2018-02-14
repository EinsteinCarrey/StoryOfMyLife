import React, { Component } from 'react';
import Banner from "./banner";
import StoriesDashBoard from "./storiesDashBoard";
import ViewStory from "./viewStory";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {fetchStories} from '../actions/storiesActions';
import Loader from "./loader";


class Homepage extends Component {
    state = {
        ...this.props,
        placeholder: {
            height: 40,
        }
    };

    /* Get story slug from URL */
    /* default = undefined*/
    storyRef = this.state.match.params.storyRef;

    componentDidMount(){
        /* Fetch stories from API */
        this.props.fetchStories(this.storyRef);
    }

    componentWillReceiveProps(nextProps) {

        /* Update the stories dashboard */
        this.state.stories !== nextProps.stories ? this.setState({ stories: nextProps.stories}): null;

        /* Display loader */
        this.state.loading !== nextProps.loading ? this.setState({ loading: nextProps.loading}): null
    }

    render() {
        const {stories, loading, placeholder} = this.state;
        return (
            <div className="homepage">

                {loading &&  <Loader classes={placeholder} loading={loading}/>}

                {
                    this.storyRef ? <ViewStory story={stories}/> :
                    (<Banner/> && <StoriesDashBoard stories={stories}/>)
                }

            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        stories: state.stories,
        loading: state.loading
    }
};

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({ fetchStories}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);