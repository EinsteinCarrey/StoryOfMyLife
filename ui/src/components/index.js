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
        loading:this.props.loading,
        placeholder: {
            height: 40,
        }
    };

    componentDidMount(){
        this.props.fetchStories();
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

                <Banner/>
                {loading &&  <Loader classes={placeholder} loading={loading}/>}
                <StoriesDashBoard stories={stories}/>

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