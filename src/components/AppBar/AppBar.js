import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const AppBarMain = (props) => {
    console.log(props);
    return (
        <div>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="Menu">
                <i className="material-icons">playlist_add</i>
                </IconButton>
                <Typography variant="h6" color="inherit" className="appbar-headtext">
                Bugify
                </Typography>
                <div className="pull-right1">
                    <div>
                    <IconButton edge="start" color="inherit" aria-label="Menu" className="pull-right"> 
                        <i className="material-icons">people</i>
                        </IconButton>
                        <IconButton edge="start" color="inherit" aria-label="Menu" className="pull-right new"> 
                       <p className="new"> Hi!&nbsp;{localStorage.getItem('name')}</p>
                        </IconButton>
                    </div>
                </div>
             </Toolbar>
            </AppBar>            
      </div>
    );
};

export default AppBarMain;