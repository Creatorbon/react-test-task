import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import YouTube from './Player'

const style = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 750,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    
});

export default withStyles(style)(class Main extends React.Component {
    state = {
        video: []
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.props.value.forEach(elem => {
                if (this.props.currentVideo === elem.id.videoId) {
                    this.setState({
                        video: [...this.state.video, { item: elem.snippet.title, currentVideo: this.props.currentVideo }]
                    })
                }
            });
        }
    }

    removeItem = async (event) => {
        let newVideo = this.state.video.filter(elem => elem.currentVideo !== event.target.id)
        this.setState({
            video: newVideo
        }, () => { });
    }

    render() {
        const { classes, currentVideo } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" color="inherit">
                                Video viewing history
                            </Typography>
                            {this.state.video.map((elem) => (
                                <div key={elem.item}>
                                    <div>{elem.item}</div>
                                    <input type="button" id={elem.currentVideo} value="Delete" onClick={this.removeItem}></input>
                                </div>
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <YouTube video={currentVideo} autoplay="1" rel="1" />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }

}
)
