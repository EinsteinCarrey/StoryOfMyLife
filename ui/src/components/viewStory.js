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
    },
    card: {
        width: '100%',
    },
    media: {
        height: 300,
    }
});


class ViewStory extends Component {

    render() {

        const {story, classes} = this.props;
        const {card, media, root} = classes;

        return(
            <section className="view-story">
                <div className={root}>
                    <Grid container spacing={24}>

                        <Grid item xs={12} >
                            <Card className={card}>
                                <CardMedia
                                    className={media}
                                    image="/banner-bg.jpg"
                                    title={story.title}
                                />
                                <CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Read
                                        </Button>
                                    </CardActions>
                                    <Typography variant="headline" component="h2">
                                        {story.title}
                                    </Typography>
                                    <Typography noWrap={true} component="p">
                                        {story.story}
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>

                    </Grid>
                </div>
            </section>
        )}
}


ViewStory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewStory);


