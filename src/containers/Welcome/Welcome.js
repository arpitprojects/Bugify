import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import WelcomeI from '../../assets/images/welcome.jpg';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

class Welcome extends Component{
    
    state = {
            name : "",
            err: false
    }
    
    proceedHandler = () => {
        // setOpen(true);
        if(this.state.name === "" || this.state.name.length < 4){
            this.setState({
                err: true
            })
        }else{
            localStorage.setItem("name" , this.state.name);
            this.props.history.push('/dashboard');
        }
    }
    nameChangeHandler = (e) =>{
        if(e.target.value.length < 4){
            this.setState({
                err: true
            })
        }else{
            this.setState({
                err: false
            })
        }
        this.setState({
            name: e.target.value
        })
    }
    render(){
        
        return (
            <div>
                <Grid container  justify="space-evenly" direction="row" >
                    <Grid item md={6} xs={12}>
                        <div className="padding-10">
                           <h1 className="title"> Bugify </h1>
                           <p className="s-title">Enter Name to Continue.</p>
                        </div>
                        <div className="padding-5">
                           <h1 className="header-1"> Welcome </h1>
                        </div>
                        <div className="padding-5 welcome-text">
                        <TextField
                        id="standard-name"
                        label="Enter your Name"
                        margin="normal"
                        className="welcome-text"
                        onChange={(e) => this.nameChangeHandler(e)}
                    />
                    <p style={{display: this.state.err ? 'block' : 'none' }} className="err" >Name should be more than 4 character!</p>
                    <br /><br/>
                    <Fab variant="extended" aria-label="Proceed" className="Fab" onClick={this.proceedHandler}>
                        Proceed
                        <i className="material-icons">play_arrow</i>
                        
                    </Fab>
                    <br /><br /><br/>
                    <p className="desc">Part spreadsheet, part database, and entirely flexible, teams use Airtable to organize their work, their way.
                   </p>
                    <div className="welcome-card">
                        
                    </div>
                    </div>  
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div>
                          <img src={WelcomeI} className="Content" />
                      </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Welcome;