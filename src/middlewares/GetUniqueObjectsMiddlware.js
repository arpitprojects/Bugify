const  GetUniqueObjectsMiddlware = function(object){
    let temp = [];
    for(let i=0;i<object.length;i++){
        temp.push(object[i].fields.Priority);
    }
    // Remove duplicates;
    temp = [...new Set(temp)];
    temp = temp.filter(x => x !== undefined);
    return temp;
}

export default  GetUniqueObjectsMiddlware;