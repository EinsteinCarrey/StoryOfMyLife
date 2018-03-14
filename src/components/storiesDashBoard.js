import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";

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
        height: 120,
    }
});


class StoriesDashBoard extends Component {

    render() {
        const {card, media, root} = this.props.classes;
        const {stories, viewStory} = this.props;

        return(
            <section className="stories-dashboard">
                <div className={root}>
                    <Grid container spacing={24}>

                        {stories.map((story, index)=>(
                            <Grid key={index} item xs={12} sm={6} md={4} >
                                <Card className={card} onClick={
                                    (e) => viewStory(story.referenceSlug, e)
                                } >
                                    <CardMedia
                                        className={media}
                                        image="/banner-bg.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography variant="headline" component="h2">
                                            {story.title}
                                        </Typography>
                                        <Typography noWrap={true} component="p">
                                            {story.story}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Read
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


