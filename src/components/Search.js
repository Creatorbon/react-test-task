import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import getData from '../data'
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const style = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 400,
            '&:focus': {
                width: 500,
            },
        },
    },
});

export default withStyles(style)(class Search extends React.Component {
    state = {
        value: '',
        data: [],
        videoId: '',
        visible: false,
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.text !== this.state.text) {
            this.searchDone();
        }
    }
    onChange = e => {
        this.setState({
            value: e.target.value
        });
    };

    searchDone = event => {
        const { value } = this.state;
        event.preventDefault();
        clearTimeout(this.timer);
        if (value) {
            this.timer = setTimeout(async () => {
                const data = await getData(value);
                this.setState({
                    data: data.items,
                    visible: true,
                    value: ''
                });
                this.props.onChangeSearch(this.state.data)
            }, 1000);
        }
    }

    playVideo = event => {
        this.props.playVideo(event.target.id)
        this.setState({ visible: false })
    }

    render() {
        const { classes } = this.props;
        return (
            <div onChange={this.searchDone}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        onChange={this.onChange}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                {this.state.visible ?
                    <Box
                        color="text.primary"
                        position="absolute"
                        width='40%'
                        top={55}
                        left={190}
                        zIndex="modal"
                    >
                        {this.state.data.map(({ id: { videoId }, snippet: { title, thumbnails } }) => (
                            <div key={videoId} >
                                <Paper elevation={0}>
                                    <Grid container spacing={2} alignItems="center" wrap="nowrap">
                                        <Grid item >
                                            <a href={`https://www.youtube.com/watch?v=${videoId}`}>
                                                <img alt={title} src={thumbnails.default.url}></img>
                                            </a>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" color="inherit">
                                                {title}
                                            </Typography>
                                        </Grid>
                                        <Grid item position="left">
                                                <input type="button" value="PLAY" id={videoId} onClick={this.playVideo}></input>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        ))}
                    </Box>
                    : null}
            </div>
        )
    }
})
