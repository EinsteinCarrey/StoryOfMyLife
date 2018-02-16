import React, { Component } from 'react';
import Banner from "./banner";
import StoriesDashBoard from "./storiesDashBoard";
import ViewStory from "./viewStory";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {fetchStories, fetchComments, createComment, authenticateUser} from '../actions/';
import Loader from "./loader";
import AuthenticationModal from "./authenticationModal";


class Homepage extends Component {
    state = {
        ...this.props,
        inputData: {
            signupAction: "login",
            passwd: "",
            username: "",
            displayName: ""
        },
        authModalShown: false,
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

        /* Update user info */
        this.state.user !== nextProps.user ? this.setState({ user: nextProps.user}): null
    }

    viewStory = (referenceSlug, e) =>{
        this.history.push(`/${referenceSlug}`);
    };

    updateInputState = (source, e) => {
        let newDataState = this.state.inputData;
        newDataState[source] = e.target.value;
        this.setState({inputData: newDataState});
    };

    createComment = () =>{
        const data = {comment: this.state.inputData.comment};
        this.props.createComment(this.storyRef, data);
    };

    authenticateUser = () =>{
        const {passwd, username, displayName, signupAction} = this.state.inputData;
        const data = {
            passwd,
            username,
            displayName
        };
        let endPoint = "";
        signupAction === "login" ? endPoint = "users/authenticate" : endPoint="users";
        this.props.authenticateUser(endPoint, data);
    };

    logOut = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("displayName");
        this.setState({user: {}})
    };

    showAuthModal = () =>{
        this.setState({authModalShown: true});
    };

    hideAuthModal = () => {
        this.setState({authModalShown: false});
    };

    render() {
        const {stories, loading, placeholder, comments, authModalShown, inputData, user} = this.state;
        const {
            createComment,
            updateInputState,
            showAuthModal,
            viewStory,
            hideAuthModal,
            authenticateUser,
            logOut
        } = this;

        return (
            <div className="homepage">

                <AuthenticationModal
                    userData={inputData}
                    authModalShown={authModalShown}
                    authenticateUser={authenticateUser}
                    hideAuthModal={hideAuthModal}
                    updateInputState={updateInputState}
                />

                {loading &&  <Loader classes={placeholder} loading={loading}/>}

                {
                    this.storyRef ?
                        <ViewStory
                            comments={comments}
                            createComment={createComment}
                            updateInputState={updateInputState}
                            /* Pass only the story that matches the storyRef */
                            story={stories.find(x => x.referenceSlug === this.storyRef)}
                        /> :
                        <div>
                            <Banner
                                user={user}
                                logOut={logOut}
                                showAuthModal={showAuthModal}
                            />
                            <StoriesDashBoard
                                stories={stories}
                                viewStory={viewStory}/>
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
        comments: state.comments,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({fetchStories, fetchComments, createComment, authenticateUser}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);