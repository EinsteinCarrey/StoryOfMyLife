import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


class Banner extends Component {
    render() {
        const {showAuthModal} = this.props;

        return(
            <div className="header">
                {/**
                 * Banner at the top of the page
                 * Fades out when user scrolls up
                 **/
                }
                <div className="login-btn">
                    <Button size="large" variant="raised"  color="primary" onClick={showAuthModal}>
                        Login
                    </Button>
                </div>

                <section className="banner">
                    <Typography className="homepage-title" variant="display3">
                        Story of my life
                    </Typography>
                </section>

                {/**
                 * Fixed banner at the top of the page
                 * Only visible when user scrolls up
                 **/
                }
                <section className="minimized-banner">
                    <div className="minimized-homepage-title">Story of my life</div>
                </section>
            </div>
    )}
}

export default Banner;