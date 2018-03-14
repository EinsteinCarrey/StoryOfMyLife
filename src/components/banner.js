import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


class Banner extends Component {
    render() {
        const {showAuthModal, logOut, user, showCreateStoryModal} = this.props;
        const userLoggedIn = user.displayName;

        return(
            <div className="header">
                {/**
                 * Banner at the top of the page
                 * Fades out when user scrolls up
                 **/
                }
                <div className="login-btn">
                    {
                        userLoggedIn ?
                            <div>
                                <Button size="large" variant="raised" color="default">
                                    Hi {userLoggedIn}
                                </Button>
                                <Button size="large" variant="raised" color="primary" onClick={logOut}>
                                    Log Out
                                </Button>
                            </div> :
                            <div>
                                <Typography
                                    color="primary"
                                    variant="headline">
                                    <div className={"banner-buttons"}
                                         onClick={showCreateStoryModal}>
                                        Tell your story
                                    </div>
                                    <div className={"banner-buttons"}
                                         onClick={showAuthModal}>
                                        Login
                                    </div>
                                </Typography>
                            </div>
                    }
                </div>

                <section className="banner">
                    <Typography variant="display3" className="homepage-title">
                        <div className="app-name">Story of my life</div>
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