let status = 'no-game';
let settings = {};
let cellStartMass = 300;
let cells = [];
let players = {};
let userIds = [];
let ip_connections = {};
let gameServ;
let expressWs;
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function idInUse(id) {
    let RETURN = false;
    for(let i=0; i<userIds.length; i++){
        if (userIds[i] == id){
            RETURN = true;
        }
    }
    return RETURN
}

exports.init = (gameVars, express) => {
    settings = gameVars;
    gameServ = express();
    expressWs = require('express-ws')(gameServ);

    gameServ.ws('/new', (ws, req) => {
        ws.on('message', (dat) => {
            let ip = ws._socket.remoteAddress;
            let data = JSON.parse(dat);
            if (ip_connections[ip]){
                if (ip_connections[ip] < 4) {
                    ip_connections[ip]++;
                    let id = makeid();
                    if(idInUse(id)){
                        id = makeid();
                        if(idInUse(id)){
                            id = makeid();
                        }
                    }
                    let player = {
                        name : data.name,
                        playerId : id,
                        mass : cellStartMass,
                        cells : [{
                            cellId: 0,
                            mass: cellStartMass,
                            cords: [Math.floor((Math.random() * settings.width) + cellStartMass/2), Math.floor((Math.random() * settings.height) + cellStartMass/2)]
                        }],
                        split: 0,
                        movingTo : {
                            x : 0,
                            y : 0
                        }
                    }
                    ws.send(JSON.parse({type: 'upgrade', reason: 'Migrate Communication Servers', code: 'A-1-01', userid: id}))
                }else {
                    ws.send(JSON.parse({type: 'bad-request', reason: 'Reached Max IP Player Limit of 4, disconnect other players or wait a few minutes and rejoin.', code: 'A-1-00'}))
                }
            }
        })

    });
    gameServ.listen(801)

    status = 'paused';
}
