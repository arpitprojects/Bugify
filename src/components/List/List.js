import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import getTeamByObject from '../../middlewares/getTeamByObject';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import IconButton from '@material-ui/core/IconButton';
// import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UpdateList from '../../containers/UpdateList/UpdateList';

const List = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
      }
      function handleClose() {
        setAnchorEl(null);
      }
     const  deleteHandler = (x) => {
          props.delete(x);
      }

    const UpdateList = (x) => {
        props.update(x);
    }
    console.log('Aewwe' ,  props);
    const items = (props.data.fields.Attachments ) ? props.data.fields.Attachments : []
    let name;
    if(props.data.fields['Assigned to'] && props.team.length > 0){
        // console.log(props.team , props.data.fields['Assigned to']);
        // console.log('How');
        name = getTeamByObject(props.team , props.data.fields['Assigned to'][0]);
    }
    // alert(props.key);
    return (
    //   <Draggable draggableId={props.i} index={props.index}> 
    //    {
    //             (provided) => (
    //                 <Grid {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}>
                    <div className="ListOne-Main">
                    <Card className="ListOne">
                 <CardContent>
                <div className="text-align-left">
                    <div className="ListOne-name pull-left">
                        <p>{props.data.fields.Name ? props.data.fields.Name : 'Unnamed' }</p>
                    </div>
                    <br />
                    <div className="ListOne-status"> 
                        <Chip label={props.data.fields.Priority}/>
                    </div>
                    <div className="ListOne-priority">
                        <p>{props.data.fields['Opened Date']}</p>
                    </div>
                    <br />
                    <div className="ListOne-status"> 
                    {name  ? <Chip label={name.fields.Name}/> :   <Chip label="Not Assigned"/> }
                    </div>
                    <IconButton aria-label="Settings" className="pull-right io" onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" >
                    <i className="material-icons">more_vert</i>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                
                >
                    <MenuItem onClick={() => deleteHandler(props.data.id)}>Delete Record</MenuItem>
                    <MenuItem onClick={() => UpdateList(props.data.id)}>Expand</MenuItem>
                    {/* <MenuItem>Collapse</MenuItem> */}
                </Menu>
                </div>
                <br />
                <Grid container justify="center" alignItems="center">
                {   
                    
                    items.map((x , index) => {
        
                        return<img  key={index} alt="Remy Sharp" className="loop-images" src={x.thumbnails.large.url} /> 
                    })
                }
                </Grid>
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
                </div>
        //         </Grid>
        //         )
        //     }
        // </Draggable> 
    );
}

export default List;