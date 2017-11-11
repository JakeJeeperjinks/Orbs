let status = 'no-game';
let settings = {};
let cells = [];
let players = {};
let gameServ;
let expressWs;

exports.init = (gameVars, express) => {
    settings = gameVars;
    gameServ = express();
    expressWs = require('express-ws')(gameServ);

    gameServ.ws('')

    status = 'paused';
}
