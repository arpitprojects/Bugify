import React, { Component } from 'react'
import AppBar from '../../components/AppBar/AppBar';
import ListBar from '../../components/ListBar/ListBar';
// import div from '@material-ui/core/div';
import GetUniqueObjectsMiddlware from '../../middlewares/GetUniqueObjectsMiddlware';
import FilterObjectsByPriority from '../../middlewares/FilterObjectsByPriority';
import getNames from '../../middlewares/getNames';
import { DragDropContext } from 'react-beautiful-dnd';
import Loading from '../../components/Loading/Loading';
import UpdateList from '../UpdateList/UpdateList';
const Airtable = require('airtable');
const base = new Airtable({apiKey : 'key70eqfaSruYGCYH'}).base('appmeXBK72YLuGeFH');


class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            bugsTracker : [],
            isLoading : true,
            getMainListBar : [],
            team : [],
            namesList : [],
            updateId : "",
            updateObject : {}
        }
        this.child = React.createRef();
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData = () => {
        // let x = [];
        base('Bugs & Issues').select({
            // Selecting the first 3 records in Bugs by Priority:
            // maxRecords: 3,
            //Comment on bugs report will get all objects.
            view: "Bugs by Priority"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            // console.
            this.setState({
                bugsTracker : records,
                isLoading :    true
            }); 
            // console.log('To check' , this.state.bugsTracker)
            let x = GetUniqueObjectsMiddlware(this.state.bugsTracker);
            this.setState({
                getMainListBar : x
            })
            this.setState({
                isLoading: false
            });
            // console.log(this.state.getMainListBar);
            // console.log(x);
            // GlobalObject = records;
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }.bind(this), function done(err) {
            if (err) { console.error(err); return; }
        })

        // Fetch Team members
        base('Team Members').select({
            // Selecting the first 3 records in Main View:
            // maxRecords: 3,
            view: "Main View"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
           this.setState({
               team : records
           })
           const names = getNames(this.state.team);
           this.setState({
               namesList : names
           })
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }.bind(this), function done(err) {
            if (err) { console.error(err); return; }
        });

    }
    updatBugTracker =(object) => {
        console.log('Is i called any way!');
        const newState = [...this.state.bugsTracker];
        newState.push(object);
        this.setState({
            bugsTracker : newState
        })
        this.fetchData();
    }
    deleteHandler = (id) => {
        base('Bugs & Issues').destroy( id , function(err, deletedRecord) {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Deleted record', deletedRecord.id);
          });
          let newState = this.state.bugsTracker;
          newState = newState.filter(x => x.id !== id);
          this.setState({
              bugsTracker:newState
          })
        //   this.fetchData();
    };
    updateHandler = (id) => {
        this.setState({
            updateId : id
        });
        
        const st = [...this.state.bugsTracker];
        const newObject =  st.filter(x => x.id === this.state.updateId );
        this.setState({
            updateObject : newObject
        })
        // this.child.current.execute();

    };
    // onDragEnd =(result) => {
    //     const { source, destination, draggableId } = result;

    //     // dropped outside the list
    //     if (!destination) {
    //         return;
    //     }

    //     if (source.droppableId === destination.droppableId && destination.index === source.index) {
    //         // const items = reorder(
    //         //     this.getList(source.droppableId),
    //         //     source.index,
    //         //     destination.index
    //         // );

    //         // let state = { items };

    //         // if (source.droppableId === 'droppable2') {
    //         //     state = { selected: items };
    //         // }

    //         // this.setState(state);
    //         return;
    //     } else {
    //         // const result = move(
    //         //     this.getList(source.droppableId),
    //         //     this.getList(destination.droppableId),
    //         //     source,
    //         //     destination
    //         // );

    //         // this.setState({
    //         //     items: result.droppable,
    //         //     selected: result.droppable2
    //         // });
    //     }
    //     // console.log('Oho' , source, destination , this.state.bugsTracker);
    //     // const column = FilterObjectsByPriority(source.droppableId , this.state.bugsTracker);
    //     // column.splice(source.index , 1);
    //     // column.splice(destination.index , 0 , draggableId);
    //     // console.log('Oho' ,  column , draggableId);

    // };
  
    render(){
        return (
            <div>
                {this.state.isLoading && <Loading />}
                <AppBar />
            
            <div className="Dashboad-main__content">
                 <br /><br />
                 <div className="main-container__blocks" >
                     {
                         this.state.getMainListBar.map((x , index) => {
                             let DataObj = FilterObjectsByPriority(x , this.state.bugsTracker);

                             return  <div key={index} className="inner-blocks">
                                    <ListBar update={this.updateHandler} delete={this.deleteHandler} trigger={this.updatBugTracker} nameList={this.state.namesList} priorities={this.state.getMainListBar} team_member={this.state.team} name={x} className="ListBarMain" data={DataObj} />
                                </div>
                            {/* 
                            <DragDropContext
                                onDragEnd={this.onDragEnd}
                             > </DragDropContext> */}
                        })
                     }
                    { this.state.updateId && this.state.updateObject &&  <UpdateList ref={this.child} method={this.newMethod}  obj={this.state.updateObject} nameList={this.state.namesList} priorities={this.state.getMainListBar} team_member={this.state.team} id={this.state.updateId}/> } 
                 </div>
            </div>
        </div>
        )
    }
}

export default Dashboard;