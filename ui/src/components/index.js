import React, { Component } from 'react';
import Banner from "./banner";
import StoriesDashBoard from "./storiesDashBoard";
import ViewStory from "./viewStory";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {fetchStories, fetchComments} from '../actions/';
import Loader from "./loader";


class Homepage extends Component {
    state = {
        ...this.props,
        placeholder: {
            height: 40,
        }
    };

    history = this.props.history;

    /* Get story slug from URL */
    /* default = undefined*/
    storyRef = this.state.match.params.storyRef;

    componentWillMount(){
        /* Fetch stories from API */
        if(this.state.stories.length < 1) this.props.fetchStories();

        /* Fetch comments from API */
        if(this.storyRef) this.props.fetchComments(this.storyRef);
    }

    componentWillReceiveProps(nextProps) {

        /* Update the stories dashboard */
        this.state.stories !== nextProps.stories ? this.setState({ stories: nextProps.stories}): null;

        /* Update the comments  state */
        this.state.comments !== nextProps.comments ? this.setState({ comments: nextProps.comments}): null;

        /* Display loader */
        this.state.loading !== nextProps.loading ? this.setState({ loading: nextProps.loading}): null
    }

    viewStory = (referenceSlug, e) =>{
        this.history.push(`/${referenceSlug}`);
    };

    render() {
        const {stories, loading, placeholder, comments} = this.state;
        return (
            <div className="homepage">

                {loading &&  <Loader classes={placeholder} loading={loading}/>}

                {
                    this.storyRef ?
                        <ViewStory
                            comments={comments}
                            /* Pass only the story that matches the storyRef */
                            story={stories.find(x => x.referenceSlug === this.storyRef)}
                        /> :
                        <div>
                            <Banner/>
                            <StoriesDashBoard stories={stories} viewStory={this.viewStory}/>
                        </div>
                }

            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        stories: state.stories,
        loading: state.loading,
        comments: state.comments
    }
};

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({fetchStories, fetchComments}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);