// Radius To Mass
exports.RM = function(r){
    return Math.floor((Math.PI * r * r) / 100);
}
// Mass to Radius
exports.MR = function(m){
    return Math.sqrt((m * 100) / PI)
}
