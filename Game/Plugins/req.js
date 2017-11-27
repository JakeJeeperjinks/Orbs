// Handle Requests from Plugins
exports.req = {
    players : {
        cells : (id) => {
            if (players[id]){
                return players[id].cells;
            }else {
                return false;
            }
        },
        exists : (id) => {
            if (players[id]){
                return true;
            }else {
                return false
            }
        }
    },
    websocket : (path, available) => {
        if (path && available){
            if (available == 'public'){
                if (websocketHandle.path[path]){
                    return {approved: false, error: true, errorText: 'Path already in use'}
                }else {
                    websocketHandle.path[path] = {
                        connect : this.onupdate.websocket[path].connect,
                        message : this.onupdate.websocket[path].message,
                        disconnect : this.onupdate.websocket[path].disconnect
                    }
                }
            }
        }else {
            return {approved: false, error: true, errorText: 'Path and/or availabilty is not defined. Proper : req.websocket("/path", "public" || "private")'};
        }
    }
}
