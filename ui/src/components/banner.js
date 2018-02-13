import React, { Component } from 'react';


class Banner extends Component {
    render() {
        return(
            <div className="header">
                {/**
                 * Banner at the top of the page
                 * Fades out when user scrolls up
                 **/
                }
                <section className="banner">
                    <div className="homepage-title">Story of my life</div>
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