const getNames = (names) => {
    let nameList = [];
    for(let i=0;i<names.length;i++){
        // console.log(names[i]);
        nameList.push({name : names[i].fields.Name , id : names[i].id});
    }
    return nameList.filter(x => x.name !== undefined);
}

export default getNames;