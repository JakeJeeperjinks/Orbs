console.log('Starting...')

// Dependencies
const colors = require('colors');
console.log('[Dependency Loading] Loaded Colors'.yellow)
const express = require('express');
console.log('[Dependency Loading] Loaded Express'.yellow)
const plugin = require('./pluginLoader.js');
console.log('[Dependency Loading] Loaded Plugin Loader'.yellow)
// DONE
console.log('[Dependency Loading] Dependencies Loaded!'.green)
console.log('')
// Initialize
const app = express();
console.log('[Initialize] Initializing Express'.yellow)
//DONE
console.log('[Initialize] Done Initializing'.green)
console.log('')





// API/SERVER

//Vars
let WHEN = {temp: []};
let plugins = [];

function when(_x23423412_32142, _func234234234_324234){
    let _A21312_sdaw9324 = window.WHEN.temp.length;
    window.WHEN.temp[_A21312_sdaw9324] = setInterval(function() {
        if (eval(_x23423412_32142)){
            _func234234234_324234();
            clearInterval(window.WHEN.temp[_A21312_sdaw9324]);
        }
    }, 1);
}




let gameTick = function() {
    // Process Game, Players
}

let gameTicking;
let gameStarted = false;
let gameStart = function() {
    if (!gameStarted){
        gameStarted = true;
        console.log('Starting Game!'.bold.green);
        gameTicking = setInterval(gameTick, 1, false);
    }
}
let gameStop = function() {
    if (gameStarted){
        gameStarted = false;
        clearInterval(gameTicking);
        console.log('Stoping Game!'.bold.red);
    }
}















// ASCII LOGO
console.log('                                                                              '.green)
console.log('                                        bbbbbbbb                              '.green)
console.log('     OOOOOOOOO                          b::::::b                              '.green)
console.log('   OO:::::::::OO                        b::::::b                              '.green)
console.log(' OO:::::::::::::OO                      b::::::b                              '.green)
console.log('O:::::::OOO:::::::O                      b:::::b                              '.green)
console.log('O::::::O   O::::::O rrrrr   rrrrrrrrr    b:::::bbbbbbbbb         ssssssssss   '.green)
console.log('O:::::O     O:::::O r::::rrr:::::::::r   b::::::::::::::bb     ss::::::::::s  '.green)
console.log('O:::::O     O:::::O r:::::::::::::::::r  b::::::::::::::::b  ss:::::::::::::s '.green)
console.log('O:::::O     O:::::O rr::::::rrrrr::::::r b:::::bbbbb:::::::b s::::::ssss:::::s'.green)
console.log('O:::::O     O:::::O  r:::::r     r:::::r b:::::b    b::::::b  s:::::s  ssssss '.green)
console.log('O:::::O     O:::::O  r:::::r     rrrrrrr b:::::b     b:::::b    s::::::s      '.green)
console.log('O:::::O     O:::::O  r:::::r             b:::::b     b:::::b       s::::::s   '.green)
console.log('O::::::O   O::::::O  r:::::r             b:::::b     b:::::b ssssss   s:::::s '.green)
console.log('O:::::::OOO:::::::O  r:::::r             b:::::bbbbbb::::::b s:::::ssss::::::s'.green)
console.log(' OO:::::::::::::OO   r:::::r             b::::::::::::::::b  s::::::::::::::s '.green)
console.log('   OO:::::::::OO     r:::::r             b:::::::::::::::b    s:::::::::::ss  '.green)
console.log('     OOOOOOOOO       rrrrrrr             bbbbbbbbbbbbbbbb      sssssssssss    '.green)
console.log('                                                                              '.green)
console.log('                                                                              '.green)
console.log('                                                                              '.green)

console.log('[Game Info] Client on Port : '.bold)
plugin.load(express)


setTimeout(() => {console.log('Game Paused, join to start game!'.bold.cyan)}, 500)

// listen
app.listen(350)
