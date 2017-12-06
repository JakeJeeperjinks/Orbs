// Orbs Game Engine
// Version : 2
// Made by: Triston Stuart

// Import Modules
const Player = require(__dirname + '/Game/Cells/player.js');
const Food = require(__dirname + '/Game/Cells/food.js');
const Mouse = require(__dirname + '/Game/Physics/mouse.js');
const Split = require(__dirname + '/Game/Physics/split.js');
const W = require(__dirname + '/Game/Physics/w.js');
const fs = require('fs');
const ini = require(__dirname + '/node_modules/ini/ini.js');
const Settings_Handler = require(__dirname + '/Game/settings.js');
const vector = require(__dirname + '/Game/Vector/vector.js');
const Vector = vector.Vector;
const Converter = require(__dirname + '/Game/Vector/converter.js');
const isJSON = require(__dirname + '/Game/Tools/isjson.js');
const id = require(__dirname + '/Game/Functions/id.js')


// Get Settings
let settings = ini.parse(fs.readFileSync(__dirname + '/Game/settings.ini', 'utf-8'));
// Scan to see settings are intact
settings = Settings_Handler.check(settings);

// Variables
let status = 'non';
let blobs = [];
let players = {};
let universalPlayer = 0;
let universalFood = 0;
let clients = {};
let cell_vals = {
    color: [[settings.rgbMin1, settings.rgbMax1], [settings.rgbMin2, settings.rgbMax2], [settings.rgbMin3, settings.rgbMax3], settings.colorOpacity]
}
let ip = {
    ammount: {}
}
let allIds = []
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function initializeGame() {
    for (let i=0; i < 1000; i++){
        blobs[i] = Food(random(cell_vals.color[1][0], cell_vals.color[1][1]), random(cell_vals.color[2][0], cell_vals.color[2][1]), 127], 10, universalFood,10000, 10000);
        universalFood++;
    }
}

function gameTick() {
    let playerList = Object.getOwnPropertyNames(players);
    for (let P = 0; P < playerlist.length; P++){
        let C_player = players[playerList[P]];
        let around = [];
        for (let B = 0; B < blobs.length; B++){
            if (B.x > C_player.x - 2000 && b.x < C_player.x + 2000 && B.y > C_player.y - 2000 && b.y < C_player.y + 2000 ){
                around[around.length] = {
                    x: B.x - C_player.x,
                    y: B.y - C_player.y,
                    color: B.color,
                    radius: B.radius
                };
            }
        }
        players[playerList[P]].around = around;
        clients[C_player.id].send(JSON.stringify({}))
    }


    gameTick();
}

// On Initialization By Orbs
exports.init = (plugin_s, express) => {
    // Plugin Handler (Comming Soon...)

    console.log(('[Game Info] Settings Loaded. Check : ' + settings.check).bold)

    // Open WebSockets
    server = express();
    expressWs = require('express-ws')(server);

    // On Join Message
    server.ws('/join', (ws, req) => {
        ws.on('message', (dat) => {
            // Check if Dat exists
            if (dat){

                // Check if Dat is a JSON string
                if (isJSON(dat)){
                    // Handle request

                    // String => Object
                    let data = JSON.parse(dat);

                    // Check if message is to create player
                    if (data.newplayer) {
                        let IP = String(ws._socket.remoteAddress);
                        if (!ip.ammount[IP]){
                            ip.ammount[IP] = 0;
                        }
                        if (ip.ammount[IP] > 4){
                            ws.send(JSON.stringify({
                                error: true,
                                reason: 'Max Connections (4) for IP'
                            }))
                        }else {
                            ip.ammount[IP] += 1;
                            let NEW_ID = id.newId(allIds);
                            allIds[allIds.length] = NEW_ID;
                            let name = data.name;
                            if (name.length > 15){
                                name = 'Unnamed'
                            }
                            players[NEW_ID] = new Player(name || 'Unnamed', 128, 10000, -10000, [random(cell_vals.color[0][0], cell_vals.color[0][1]), random(cell_vals.color[1][0], cell_vals.color[1][1]), random(cell_vals.color[2][0], cell_vals.color[2][1]), 127], NEW_ID, universalPlayer)
                            ws.send(JSON.stringify({
                                error: false,
                                reason: 'creating-player',
                                id: NEW_ID
                            }));

                        }
                    }else if (data.disconnect){
                        let IP = String(ws._socket.remoteAddress);
                        ip.ammount[IP] -= 1;
                    }
                }
            }
        })
    });
    server.ws('/player/:id', (ws, req) => {
        ws.on('message', (dat) => {
            // Check if Dat exists
            if (dat){

                // Check if Dat is a JSON string
                if (isJSON(dat)){
                    let data = JSON.parse(dat);
                    let id = req.params.id;
                    if (players[id]){
                        if (data.init){
                            clients[id] = ws;
                            ws.send(JSON.stringify({reason: 'verify'}))
                        }
                    }
                }
            }
        })

    })

    server.listen(801)
}
