import React, { Component } from 'react';
import Banner from "./banner";
import StoriesDashBoard from "./storiesDashBoard";
import ViewStory from "./viewStory";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {fetchStories, fetchComments, createComment} from '../actions/';
import Loader from "./loader";


class Homepage extends Component {
    state = {
        ...this.props,
        newData: {},
        placeholder: {
            height: 40,
        }
    };

    history = this.props.history;

    /* Get story slug from URL */
    /* default = undefined*/
    storyRef = this.state.match.params.storyRef;

    componentWillMount(){
        const {fetchStories, fetchComments} = this.props;

        /* Fetch stories from API */
        if(this.state.stories.length < 1) fetchStories();

        /* Fetch comments from API */
        if(this.storyRef) fetchComments(this.storyRef);
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

    updateNewDataState = (source, e) => {
        let newDataState = this.state.newData;
        newDataState[source] = e.target.value;
        return this.setState({newData: newDataState});
    };

    createComment = () =>{
        const data = {comment: this.state.newData.comment};
        this.props.createComment(this.storyRef, data);
    };

    render() {
        const {stories, loading, placeholder, comments} = this.state;
        const {createComment, updateNewDataState} = this;
        return (
            <div className="homepage">

                {loading &&  <Loader classes={placeholder} loading={loading}/>}

                {
                    this.storyRef ?
                        <ViewStory
                            comments={comments}
                            createComment={createComment}
                            updateNewDataState={updateNewDataState}
                            /* Pass only the story that matches the storyRef */
                            story={stories.find(x => x.referenceSlug === this.storyRef)}
                        /> :
                        <div>
                            <Banner/>
                            <StoriesDashBoard
                                stories={stories}
                                viewStory={this.viewStory}/>
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
    return bindActionCreators({fetchStories, fetchComments, createComment}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);