import React from 'react';
import PropTypes from 'prop-types';
import Fade from 'material-ui/transitions/Fade';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

class Loader extends React.Component {

    render() {

        const { classes, query } = this.props;

        return(
            <div className={["loader", classes.placeholder].join(' ')}>
                {query === 'success' ? (
                    <Typography>Success!</Typography>
                ) : (
                    <Fade
                        in={query === 'progress'}
                        style={{
                            transitionDelay: query === 'progress' ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                )}
            </div>
        )}
}


Loader.propTypes = {
    classes: PropTypes.string.isRequired
};

export default Loader;

