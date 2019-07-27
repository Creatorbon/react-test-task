import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from './Search';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function Header({ onSearch, playVideo }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        My YouTube APP
                    </Typography>
                    <>
                        <Search onChangeSearch={onSearch} playVideo={playVideo}
                        ></Search>
                    </>
                </Toolbar>
            </AppBar>
        </div>
    );
}
