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
    this.r = sqrt((mass * 100) / PI);
    this.color = [Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)];
}

let gameTick = setInterval(() => {
    //game
    if (status == 'new'){
        console.log('Setting up new game...');
        for (let i=0; i<10000; i++){
            cells[i] = new food(10000, 10000, 12);
        }
        status = 'running';
        console.log('Game running...');
    }else if (status == 'running'){

    }
}, 1)

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

function radToMass(r){
    return Math.floor((Math.PI * r * r) / 100);
}
function massToRad(mass){
    return Math.sqrt((mass * 100) / PI)
}
function around(x, y){
    let AR_BLOBS = [];
    for (let i=0; i<cells.length; i++){
        if (cells[i].x < x+2000 && cells[i].x > x-2000 && cells[i].y < y+2000 && cells[i].y > y-2000){
            let h = cells[i];
            AR_BLOBS[AR_BLOBS.length] = {mass: h.mass, x: (h.x - x), y: (h.y - y), color: h.color};
        }
    }
    return AR_BLOBS;
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
            let ip = ws._socket.remoteAddress;
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
                        let CELLS = around(x, y);
                        packet.data.blobs = CELLS;
                        ws.send(JSON.stringify(packet));
                    }
                }
            }else if (data.type == 'mouse'){
                let player = players[data.id];
                if (player){
                    let x = player.blob.x;
                    let y = player.blob.y;
                    let mouseX = data.mouse.x;
                    let mouseY = data.mouse.y;
                    let vel = new vector(mouseX-(data.width/2), mouseY-(data.height/2));
                    vel.setMag(3/(sqrt(massToRad(player.blob.mass)) / 32));
                    player.blob.x += vel.x;
                    player.blob.y += vel.y;
                }
                /* this.update = function() {
                    if (this.pos.x < worldX && this.pos.x > -worldX && this.pos.y < worldY && this.pos.y > -worldY){
                        if (mouseX <= (width/2 + 10) && mouseX >= (width/2 - 10) && mouseY <= (height/2 + 10) && mouseY >= (height/2 - 10)){
                            //nothing
                        }else {
                            let vel = createVector(mouseX-width/2, mouseY-height/2);
                            vel.setMag(3/(sqrt(this.r) / 32));
                            this.pos.add(vel);
                        }
                        this.r -= (0.0025 * (sqrt(this.r)/ 1.5))
                    }else {
                        if (!(this.pos.x < worldX)) {
                            this.pos.x--;
                        }else if (!(this.pos.x > -worldX)){
                            this.pos.x++;
                        }
                        if (!(this.pos.y < -worldY)){
                            this.pos.y--;
                        }else if (!(this.pos.y > worldY)){
                            this.pos.y++;
                        }
                    }


                } */
            }
        })

    });
    gameServ.listen(801)

    status = 'paused';
}
