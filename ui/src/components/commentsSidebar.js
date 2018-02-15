import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";


let styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%",
        background: "#f6f6f6",
        paddingLeft: "5px"
    },
    card: {
        width: '100%',
    }
});


class CommentsSidebar extends Component {

    state = {
        newComment:""
    };

    render() {

        const {comments, classes, createComment, updateNewDataState} = this.props;
        const {newComment} = this.state;
        const {card, textField} = classes;

        return(
            <Grid item xs={12} md={4}>
                <Card className={card}>
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            Comments
                        </Typography>
                    </CardContent>

                    <Grid container justify="center" spacing={16}>
                        <Grid item xs={10}>
                            <TextField
                                onChange={(e) => updateNewDataState("comment", e)}
                                id="create-comment"
                                label="Comment on this story"
                                multiline
                                rows="4"
                                defaultValue={newComment}
                                className={textField}
                                margin="dense"
                            />
                            <Button
                                onClick={createComment}
                                size="small"
                                variant="raised"
                                color="primary">
                                Post
                            </Button>
                        </Grid>
                        {comments.map((comment, index)=>(
                            <Grid item xs={10}>
                                <Card key={index} className={card}>
                                    <CardContent>
                                        <Typography component="p">
                                            {comment.comment}
                                        </Typography>
                                        <Typography align="right" gutterBottom variant="caption">
                                            {comment.createdOn}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Grid>
    )}
}


CommentsSidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentsSidebar);