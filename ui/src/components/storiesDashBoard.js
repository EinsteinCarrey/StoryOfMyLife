import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Loader from "./loader";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";

const stories = [
    "title 1",
    "title 2",
    "title 3",
    "title 4",
    "title 5",
    "title 6",
    "title 7",
    "title 8",
    "title 9",
    "title 10"
];

let styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 170,
    },
    placeholder: {
        height: 40,
    }
});


class StoriesDashBoard extends Component {

    state = {
        loading: false,
        query: 'progress',
    };
    classes = this.props.classes;

    render() {
        const {card, media, root, button, placeholder} = this.classes;
        const { loading, query } = this.state;

        return(
            <section className="stories-dashboard">
                <Loader classes={placeholder} query={query}/>
                <div className={root}>
                    <Grid container spacing={24}>

                        {stories.map((story, index)=>(
                            <Grid key={index} item xs={12} sm={6} md={4} >
                                <Card className={card}>
                                    <CardMedia
                                        className={media}
                                        image="/banner-bg.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography variant="headline" component="h2">
                                            {story}
                                        </Typography>
                                        <Typography component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </section>
        )}
}


StoriesDashBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(StoriesDashBoard);


