import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import Comment from 'material-ui-icons/Comment';
import Typography from 'material-ui/Typography';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import CommentsSidebar from "./commentsSidebar";

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

        let {story, classes, comments, createComment, updateNewDataState} = this.props;
        const {card, media, root} = classes;

        if(!story){
            story = {
                title: "",
                story: ""
            }
        }

        return(
            <section className="view-story">
                <div className={root}>
                    <Grid container spacing={0}>

                        <Grid item xs={12} >
                            <Card className={card}>
                                <CardMedia
                                    className={media}
                                    image="/banner-bg.jpg"
                                    title={story.title}
                                >
                                    <br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/><br/><br/>
                                    <Typography variant="display2" >
                                        {story.title}
                                    </Typography>
                                    <Typography variant="subheading" align="right" >
                                        Posted on: {story.createdOn}
                                        <br/>
                                        Written by: {story.user}
                                    </Typography>

                                </CardMedia>
                            </Card>
                        </Grid>

                        <Grid container justify="center" spacing={8}>

                            <Grid item xs={12} md={8} >
                                <Card className={card}>
                                    <CardContent>

                                        <Typography variant="headline" component="h2">
                                            {story.title}
                                        </Typography>
                                        <Typography align="right" >
                                            <IconButton aria-label="Thumbs Up" disabled color="primary">
                                                <ThumbUp />
                                            </IconButton>
                                            <IconButton aria-label="Thumbs Up" disabled color="primary">
                                                <ThumbDown />
                                            </IconButton>
                                            <IconButton aria-label="Thumbs Up" disabled color="primary">
                                                <Comment />
                                            </IconButton>
                                        </Typography>
                                        <Typography component="p">
                                            {story.story}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>

                            <CommentsSidebar
                                createComment={createComment}
                                updateNewDataState={updateNewDataState}
                                comments={comments}/>

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


