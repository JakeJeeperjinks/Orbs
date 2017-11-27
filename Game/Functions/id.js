function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function newId(allIds) {
    let id = makeid();
    let inUse = false;
    for (let i=0; i<allIds; i++){
        if (allIds[i] == id){
            inUse = true;
        }
    }
    if (inUse){
        return newId(allIds);
    }else {
        return id;
    }
}
exports.newId = function(allIds){
    return newId(allIds)
}
