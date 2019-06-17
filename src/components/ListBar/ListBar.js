import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '../List/List';
import CreateList from '../../containers/CreateList/CreateList';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Grid from '@material-ui/core/Grid';

const ListBar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
      }
      function handleClose() {
        setAnchorEl(null);
      }
      console.log('N' , props);
    
    return (
        <div className="ListBarScroll">
               {/* <Droppable droppableId="droppable"> */}
              <Card className="card-new">
              <Chip label={props.name} className="pull-left listbar-chip" />
              <IconButton aria-label="Settings" className="pull-right" onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" >
                    <i className="material-icons">expand_more</i>
                </IconButton>
                <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      
      >
        <MenuItem>New Record</MenuItem>
        <MenuItem>Send Record</MenuItem>
        <MenuItem>Collapse</MenuItem>
      </Menu>
      <div className="clear"></div>
      <br />
      {props.data && props.team_member && props.data.map((x , index) => { const i = `draggable${index}`; return  <List className="margin-top-2" team={props.team_member} update={props.update} delete={props.delete}  data={x} key={index} i={i} index={index}/> })}
        {/* <Droppable droppableId={props.name}>
        {   provided => (
                <Grid   innerRef={provided.innerRef}  {...provided.droppableProps}>
                     {props.data && props.team_member && props.data.map((x , index) => { const i = `draggable${index}`; return  <List team={props.team_member}  data={x} key={index} i={i} index={index}/> })}
                    {provided.placeholder}
                </Grid>

            )
        }
           
        </Droppable> */}
    </Card>
    <CreateList trigger={props.trigger} prio={props.name} nameList={props.nameList} priorities={props.priorities}/>
        </div>
    );
}   

export default ListBar;