const getTeamByObject = (team, assign) => {
    let temp;
    const team_mem = assign[0];
    for(let i=0;i<team.length;i++){
        // console.log(team[i].id, assign);
        if(assign === team[i].id){
            // console.log(team[i]);
            temp = team[i];
        }
    }
    // console.log(temp);
    return temp;
}

export default getTeamByObject;