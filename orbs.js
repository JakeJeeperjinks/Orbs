console.log('Starting...')

// Dependencies
const colors = require('colors');
console.log('[Dependency Loading] Loaded Colors'.yellow)
const express = require('express');
console.log('[Dependency Loading] Loaded Express'.yellow)

// DONE
console.log('[Dependency Loading] Dependencies Loaded!'.green)
console.log('')


// Initialize
const app = express();
console.log('[Initialize] Initializing Express'.yellow)

//DONE
console.log('[Initialize] Done Initializing'.green)
console.log('')


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

console.log('[Game Info] Client on Port : ')


console.log('Game Paused, join to start game!'.bold.cyan)

// listen
app.listen(350)
