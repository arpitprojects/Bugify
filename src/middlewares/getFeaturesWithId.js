const getFeaturesWithId = (arr) => {
    let temp = [];
    for(let i=0;i<arr.length;i++){
        temp.push({name : arr[i].fields.Feature , id : arr[i].id});
    }
    return temp;
}

export default getFeaturesWithId;