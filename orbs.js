console.log('Starting...')

// Dependencies
const colors = require(__dirname + '/node_modules/colors/lib/index.js');
console.log('[Dependency Loading] Loaded Colors'.yellow)
const express = require(__dirname + '/node_modules/express/index.js');
console.log('[Dependency Loading] Loaded Express'.yellow)
const plugin = require('./pluginLoader.js');
console.log('[Dependency Loading] Loaded Plugin Loader'.yellow)
const game = require('./game.js');
console.log('[Dependency Loading] Loaded Game'.yellow)
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

function when(_x23423412_32142, _func234234234_324234){
    let _A21312_sdaw9324 = window.WHEN.temp.length;
    window.WHEN.temp[_A21312_sdaw9324] = setInterval(function() {
        if (eval(_x23423412_32142)){
            _func234234234_324234();
            clearInterval(window.WHEN.temp[_A21312_sdaw9324]);
        }
    }, 1);
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

console.log('[Game Info] Game Started!'.bold)
console.log('[Game Info] Loading Plugins!'.bold)
let plugins = plugin.load(express);
// plugins[0] = Plugin List (Name of all plugins);
// plugins[1] = Plugin Code (Object, by name);
// plugins[2] = Game Plugins (Load in game engine)


game.init(plugins[2], express)
setTimeout(() => {console.log('Game Paused, join to start game!'.bold.cyan)}, 500)

// listen
app.listen(800)
