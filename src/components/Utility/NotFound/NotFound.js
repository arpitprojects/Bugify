import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import I from '../../../assets/images/404.jpg';
import Fab from '@material-ui/core/Fab';

const notFound = () => {
    return (
        <div className="not-found__main">
            <Grid container>
                <Grid item md={12}  xs={12}>
                    
                    <br />
                    <img src={I}  className="image-440"/>
                    <h1 className="not-found">Looks like the page you are at, does not exist</h1>
                    <br /><br />
                    <Fab variant="extended" aria-label="Home" className="not-found__btn">
                        Home
                    </Fab>
                </Grid>
            </Grid>
        </div>
    );
}

export default notFound;