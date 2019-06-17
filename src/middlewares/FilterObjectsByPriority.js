const FilterObjectsByPriority = (prio , object) => {
    let temp = [];
    for(let i=0;i<object.length;i++){
        if(object[i].fields){
            if(object[i].fields.Priority === prio){
                temp.push(object[i]);
            }
        }
    }
    return temp;
}

export default FilterObjectsByPriority;