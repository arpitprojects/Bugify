import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-responsive-modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import getFeaturesWithId from '../../middlewares/getFeaturesWithId';
const Airtable = require('airtable');
const base = new Airtable({apiKey : 'key70eqfaSruYGCYH'}).base('appmeXBK72YLuGeFH');

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
class UpdateList extends Component{
    state = {   
        open: false,
        t : "",
        tt : "",
        "Notified Users?" : false,
        featuresObject : [],
      };
    openModal = () => {
        this.setState({
            open: true
        })
    }
    onCloseModal = () => {
        this.setState({
            open : false
        })
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
     }
     flatten = (arr) => {
        // return arr.reduce(function (flat, toFlatten) {
        //   return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
        // }, []);
        return arr;
      }
      
     submitHandler = () => {
         const copiedObject = {...this.state};
         for(let p in copiedObject){
             delete copiedObject['t']; delete copiedObject['tt'];
             delete copiedObject['featuresObject'];delete copiedObject['open'];
         }
         if( copiedObject['Status']){
            copiedObject['Status'] = this.flatten([copiedObject['Status']]);
         }
         if(copiedObject['Assigned to']){
            copiedObject['Assigned to'] = this.flatten( [copiedObject['Assigned to']]);
        }
        if(copiedObject['Created by']){
            copiedObject['Created by'] = this.flatten([copiedObject['Created by']]);
        }
        if(copiedObject['Associated Features']){
            copiedObject['Associated Features'] = this.flatten([copiedObject['Associated Features']]);
        }
        console.log(copiedObject);   
        base('Bugs & Issues').create(copiedObject , function(err, record) {
            if (err) {
            console.error(err);
            return;
            }
            console.log(record.getId());
        });
        this.props.trigger(copiedObject);
        this.setState({ open: false })
     }
     checkHandler(){
        if(this.state['Notified Users?'] === false){
            this.setState({
                "Notified Users?" : true
            })
        }else{
            this.setState({
                "Notified Users?" : false
            })
        }
     }
     execute = () => {
        if(this.props.id){
            
                 this.setState({
                     open:true
                 })
             }
     }
     componentDidMount(){
         
        //  if(this.props.id){
            
        //      this.setState({
        //          open:true
        //      })
        //  }
         // For update modal open
        this.resolveDate();
        base('Features').select({
            // Selecting the first 3 records in Main View:
            // maxRecords: 3,
            view: "Main View"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            const returedObj = getFeaturesWithId(records);
            this.setState({
                featuresObject : returedObj
            })
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }.bind(this), function done(err) {
            if (err) { console.error(err); return; }
        });

     }
     resolveDate = () => {
        let today = new Date();
        let tn = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        
        let yyyy = today.getFullYear().toString().split("").slice(2,4).join("");
        if (dd < 10) {
          dd = '0' + dd;
        } 
        if (mm < 10) {
          mm = '0' + mm;
        } 
         today = mm + '-' + dd + '-' + yyyy;
        let ttime = today + ":" + tn.getHours() +" "+tn.getMinutes();
       this.setState({
           t : today
       })
       this.setState({
           tt : ttime
       })
     }

    render(){
        const { open } = this.state;
        // this.props.obj = this.props.obj ? this.props.obj : {}
        const p =  this.props.priorities ? this.props.priorities : []
        const namesListing = this.props.nameList ? this.props.nameList : []
        this.state.featuresObject = this.state.featuresObject ? this.state.featuresObject : []
        return (
            <div>
            <Modal open={open} onClose={this.onCloseModal} center className="customOverlay customModal">
            <br/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField className="width-class"
                id="outlined-name"
                label="Name"
                name="Name"
                value={this.props.obj.Name}
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                variant="outlined"
            />
                </Grid>
                <Grid item xs={12} sm={6} className="select-adjust">
                <InputLabel>Priority</InputLabel>
                <FormControl disabled>
                <Select className="width-class"
                onChange={(e) => this.handleChange(e)}
                name="Priority"
                value={this.props.obj.Priority}
                >
                    {
                        p.map((x , index) => {
                            return <MenuItem value={x} key={index}>
                            {x}
                        </MenuItem>
                        })
                    }
                </Select>
                </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField className="width-class"
                id="outlined-name"
                label="Opened Date"
                name="Opened Date"
                onChange={(e) => this.handleChange(e)}
                value={this.props.obj['Opened Date']}
                margin="normal" 
                variant="outlined" disabled
            />
                </Grid>
                <Grid item xs={12} sm={6} className="select-adjust">
                <InputLabel htmlFor="age-simple">Assigned To</InputLabel>
                <Select className="width-class"
                value={this.props.obj['Assigned to']}
                onChange={(e) => this.handleChange(e)}
                name="Assigned to"
                >
                    {
                        namesListing.map((x , index) => {
                            return   <MenuItem value={x.id} key={index}>
                                       {x.name}
                                    </MenuItem>
                        })
                    }
                </Select>
                {/* Testing multiple inputs */}
                {/* <FormControl>
                <InputLabel>Assigned To</InputLabel>
                <Select 
                multiple
                value={this.state['Assigned to']}
                name="Assigned to"
                onChange={(e) => this.handleChange(e)}
                input={<Input id="select-multiple" />}
                MenuProps={MenuProps}
                >
                {namesListing && namesListing.map(name => (
                    <MenuItem key={name} value={name}>
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>     */}
                {/* End of testing multiple inputs */}


                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField className="width-class"
                id="outlined-name"
                label="Opened Date & Time (GMT)"
                name="Opened Date & Time (GMT)"
                onChange={(e) => this.handleChange(e)}
                value={this.props.obj['Opened Date & Time (GMT)']}
                margin="normal"
                variant="outlined" disabled
            />
                </Grid>
                <Grid item xs={12} sm={6} className="select-adjust">
                <InputLabel htmlFor="age-simple">Status</InputLabel>
                <Select className="width-class"
                onChange={(e) => this.handleChange(e)}
                name="Status"
                value={this.props.obj.Status}
                >
                    <MenuItem value="Blocked">Blocked</MenuItem>
                    <MenuItem value="Complete" >Complete</MenuItem>
                    <MenuItem value="In-progress">In-progress</MenuItem>
                    <MenuItem value="Can't Reproduce" >Can't Reproduce</MenuItem>
                    <MenuItem value="Won't Fix" >Won't Fix</MenuItem>
                    <MenuItem value="By Design">By Design</MenuItem>
                    <MenuItem value="Duplicate">Duplicate</MenuItem>
                    
                </Select>
                </Grid>
            </Grid>
                

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField className="width-class"
                id="outlined-name"
                label="Bug Source"
                name="Bug Source"
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                value={this.props.obj['Bug Source']}
                variant="outlined"
            />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField className="width-class"
                id="outlined-name"
                label="Description"
                name="Description"
                value={this.props.obj['Attachments']}
                onChange={(e) => this.handleChange(e)}
                margin="normal"
                variant="outlined"
            />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="age-simple">Notified Users?</InputLabel>
                <Checkbox
                    onChange={ (e) => this.checkHandler(e)}
                    name="Notified Users?"
                    // value={()=> this.checkHandler()}
                    inputProps={{
                    'aria-label': 'primary checkbox',
                    }}
                />
                </Grid>
                <Grid item xs={12} sm={6} className="select-adjust">
                <InputLabel htmlFor="age-simple">Created by</InputLabel>
                <Select className="width-class"
                 
                onChange={(e) => this.handleChange(e)}
                name="Created by" value={this.props.obj['Created by']}
                >
                    {
                        namesListing.map((x , index) => {
                            return   <MenuItem value={x.id} key={index}>
                                       {x.name}
                                    </MenuItem>
                        })
                    }
                </Select>
                </Grid>
            </Grid>
            
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                {/* <TextField className="width-class"
                id="outlined-name"
                label="Opened Date"
                name="Opened Date"
                onChange={(e) => this.handleChange(e)}
                value={this.state.t}
                margin="normal"
                variant="outlined"
            /> */}
                </Grid>
                <Grid item xs={12} sm={6} className="select-adjust">
                <InputLabel htmlFor="age-simple">Associated Features</InputLabel>
                <Select className="width-class"
                onChange={(e) => this.handleChange(e)}
                name="Associated Features"
                value={this.props.obj['Associated Features']}
                >
                    {
                        this.state.featuresObject.map((x , index) => {
                            return   <MenuItem value={x.id} key={index}>
                                       {x.name}
                                    </MenuItem>
                        })
                    }
                </Select>
                </Grid>
            </Grid>
            <Button variant="contained" onClick={() => this.submitHandler()}>
                Create Bug
            </Button>
            </Modal>
        </div>
        );
    }
}

export default UpdateList;
