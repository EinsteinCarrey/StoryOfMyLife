import React, { Component } from 'react';
import Banner from "./banner";
import StoriesDashBoard from "./storiesDashBoard";
import {connect, bindActionCreators} from 'react-redux';


class Homepage extends Component {

    componentWillUnmount() {
        clearTimeout(this.timer);
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
        return (
            <div className="homepage">

                <Banner/>
                <StoriesDashBoard/>

            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        stories: state.stories
    }
};


export default connect(mapStateToProps)(Homepage);
// export default Homepage;