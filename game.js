let status = 'no-game';
let settings = {};
let cellStartMass = 300;
let cells = [];
let players = {};
let userIds = [];
let ip_connections = {};
let gameServ;
let expressWs;
let PI = Math.PI;
let sqrt = Math.sqrt;
let vector = require('vector').Vector;


function food(x, y, mass){
    this.x = Math.floor((Math.random() * (2 * x)) + 1);
    if (this.x > x){
        this.x = -1 * (this.x - x);
    }
    this.y = Math.floor((Math.random() * (2 * y)) + 1);
    if (this.y > y){
        this.y = -1 * (this.y - y);
    }
    this.mass = mass;
    this.r = function(){return sqrt((this.mass * 100) / PI)};
    this.color = [Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)];
}

let gameTick = setInterval(() => {
    //game
    if (status == 'new'){
        console.log('Setting up new game...');
        for (let i=0; i<5000; i++){
            cells[i] = new food(10000, 10000, 12);
        }
        status = 'running';
        console.log('Game running...');
    }else if (status == 'running'){

    }
}, 100)

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

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function radToMass(r){
    return Math.floor((Math.PI * r * r) / 100);
}
function massToRad(mass){
    return Math.sqrt((mass * 100) / PI)
}
function around(x, y, id){
    let AR_BLOBS = [];
    let AR_PLAYERS = [];
    for (let i= cells.length-1; i>=0;i--){
        if (cells[i].x < x+2000 && cells[i].x > x-2000 && cells[i].y < y+2000 && cells[i].y > y-2000){
            let h = cells[i];
            AR_BLOBS[AR_BLOBS.length] = {mass: h.mass, x: (h.x - x), y: (h.y - y), color: h.color};
        }
        let cCell = cells[i];
        let player = players[id];
        let v1 = new vector(player.blob.x, player.blob.y);
        let v2 = new vector(cCell.x, cCell.y);
        let d = vector.distance(v1, v2);
        player.r = massToRad(player.blob.mass);
        if (d < player.r + (cCell.r() / 2) && player.blob.mass > (cCell.mass + (cCell.mass / 100))){
            let sum = PI * player.r * player.r + PI * cCell.r() * cCell.r();
            players[id].blob.mass = radToMass(sqrt(sum / PI));
            cells.splice(i, 1);
            food(10000, 10000, 12);
        }
    }
    let playerList = Object.getOwnPropertyNames(players);
    for (let I= playerList.length-1; I>=0;I--){
        let cPlayer = players[playerList[I]];
        if (cPlayer.blob.x < x+2000 && cPlayer.blob.x > x-2000 && cPlayer.blob.y < y+2000 && cPlayer.blob.y > y-2000 && playerList[I] != id && !cPlayer.dead){
            let h = cPlayer;
            AR_PLAYERS[AR_PLAYERS.length] = {mass: h.blob.mass, x: (h.blob.x - x), y: (h.blob.y - y), color: h.blob.color, name: h.name};
            let cCell = cPlayer;
            let player = players[id];
            let v1 = new vector(player.blob.x, player.blob.y);
            let v2 = new vector(cCell.blob.x, cCell.blob.y);
            let d = vector.distance(v1, v2);
            player.r = massToRad(player.blob.mass);
            cCell.r = massToRad(cCell.blob.mass);
            if (d < player.r + (cCell.r / 2) && player.blob.mass > (cCell.blob.mass + (cCell.blob.mass / 100))){
                let sum = PI * player.r * player.r + PI * cCell.r * cCell.r;
                players[id].blob.mass = radToMass(sqrt(sum / PI));
                players[playerList[I]].dead = true;
            }
        }
    }
    return [AR_BLOBS, AR_PLAYERS];
}

exports.init = (gameVars, express) => {
    settings = gameVars;
    gameServ = express();
    expressWs = require('express-ws')(gameServ);

    gameServ.ws('/new', (ws, req) => {
        ws.on('message', (dat) => {
            let ip = ws._socket.remoteAddress;
            let data = JSON.parse(dat);
            let playerName = '';
            for (let i=0; i< (data.name.split('')).length && i < 16; i++){
                playerName += (data.name.split(''))[i];
            }
            if (data.name.length == 0){
                playerName == 'Unnamed Cell';
            }
            let newId = makeid();
            let playerColor = [Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)]
            players[newId] = {
                name: playerName,
                dead: false,
                blob: {
                    color: playerColor,
                    mass: 128,
                    x: 0,
                    y: 0
                }
            }
            ws.send(JSON.stringify({
                blob : {
                    name : playerName,
                    color : playerColor,
                    mass: 128
                },
                id : newId
            }));
            if (status == 'paused'){
                console.log('Client Connected! Game Unpaused'.bold.cyan);
                status = 'new';
            }
        })

    });
    gameServ.ws('/player/:id', (ws, req) => {
        ws.on('message', (dat) => {
            if (ws._socket.remoteAddress){
                let ip = ws._socket.remoteAddress;
            }
            let data = JSON.parse(dat);
            let packet = {
                type: '',
                data: {

                }
            }
            if (data.type == 'request'){
                if (data.request == 'blob'){
                    packet.type = 'blob-data';
                    let player = players[data.id];
                    if (player){
                        packet.data = player;
                        ws.send(JSON.stringify(packet));
                    }
                }else if (data.request == 'blobs'){
                    packet.type = 'blobs-data';
                    let player = players[data.id];
                    if (player){
                        let x = player.blob.x;
                        let y = player.blob.y;
                        let CELLS = around(x, y, data.id);
                        packet.data.blobs = CELLS[0];
                        packet.data.players = CELLS[1];
                        ws.send(JSON.stringify(packet));
                    }
                }
            }else if (data.type == 'mouse'){
                let player = players[data.id];
                if (player){
                    if (!player.dead){
                        // Mouse
                        let x = player.blob.x;
                        let y = player.blob.y;
                        let mouseX = data.mouse.x;
                        let mouseY = data.mouse.y;
                        if ((mouseX-(data.width/2)) < 5 && (mouseY-(data.height/2)) < 5 && (mouseX-(data.width/2)) > -5 && (mouseY-(data.height/2)) > -5 ){
                            //nothing
                        }else {
                            let vel = new vector(mouseX-(data.width/2), mouseY-(data.height/2));
                            vel.setMag(3/(sqrt(massToRad(player.blob.mass)) / 32));
                            players[data.id].blob.x += vel.x;
                            players[data.id].blob.y += vel.y;
                        }
                    }


                }
            }else if (data.type == 'respawn'){
                let player = players[data.id];
                if (player){
                    if (player.dead){
                        let playerName = '';
                        for (let i=0; i< (data.name.split('')).length && i < 16; i++){
                            playerName += (data.name.split(''))[i];
                        }
                        if (data.name.length == 0){
                            playerName == 'Unnamed Cell';
                        }
                        let playerColor = [Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)]
                        players[data.id] = {
                            name: playerName,
                            dead: false,
                            blob: {
                                color: playerColor,
                                mass: 128,
                                x: random(-10000, 10000),
                                y: random(-10000, 10000)
                            }
                        }
                    }
                }
            }
        })

    });
    gameServ.listen(801)

    status = 'paused';
}
