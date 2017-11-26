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
const ini = require(__dirname + '/node_modules/init/init.js');
const Settings_Handler = require(__dirname + '/Game/settings.js');
const vector = require(__dirname + '/Game/Vector/vector.js');
const Vector = vector.Vector;
const Converter = require(__dirname + '/Game/Vector/converter.js');
const isJSON = require(__dirname + '/Game/Tools/isjson.js');


// Get Settings
let settings = ini.parse(fs.readFileSync(__dirname + '/Game/settings.ini', 'utf-8'));
// Scan to see settings are intact
settings = Settings_Handler.check(settings);

// Variables
let status = 'non';
let blobs = [];
let players = {};
let cell_vals = {
    color: [[settings.rgbMin1, settings.rgbMax1], [settings.rgbMin2, settings.rgbMax2], [settings.rgbMin3, settings.rgbMax3], settings.colorOpacity]
}


// On Initialization By Orbs
exports.init = (plugin_s, express) => {
    // Plugin Handler (Comming Soon...)

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

                    }
                }
            }
        })
    })

    server.listen(801)
}
