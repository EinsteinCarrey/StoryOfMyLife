import React from 'react';
import PropTypes from 'prop-types';
import Fade from 'material-ui/transitions/Fade';
import { CircularProgress } from 'material-ui/Progress';

class Loader extends React.Component {

    render() {

        const { classes, loading } = this.props;

        return(
            <div className={["loader", classes.placeholder].join(' ')}>
                <Fade in={loading} style={{transitionDelay: loading ? '100ms' : '0ms',}} unmountOnExit>
                    <CircularProgress />
                </Fade>
            </div>
        )}
}


Loader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default Loader;

