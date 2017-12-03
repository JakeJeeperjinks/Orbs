console.log('Starting...')
let version = "build_A_0_0_0_1"

// Dependencies
const colors = require(__dirname + '/node_modules/colors/lib/index.js');
console.log('[Dependency Loading] Loaded Colors'.yellow)
const express = require(__dirname + '/node_modules/express/index.js');
console.log('[Dependency Loading] Loaded Express'.yellow)
const request = require(__dirname + '/node_modules/request/index.js');
console.log('[Dependency Loading] Loaded Request'.yellow)
const plugin = require('./pluginLoader.js');
console.log('[Dependency Loading] Loaded Plugin Loader'.yellow)
const game = require('./game.js');
console.log('[Dependency Loading] Loaded Game'.yellow)
const commands = require('./commands.js');
console.log('[Dependency Loading] Loaded Commands'.yellow)
const readline = require('readline');
console.log('[Dependency Loading] Loaded Readline'.yellow)
// DONE
console.log('[Dependency Loading] Dependencies Loaded!'.green)
console.log('')
// Initialize
const app = express();
console.log('[Initialize] Initializing Express'.yellow)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('[Initialize] Initializing Readline'.yellow)
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
console.log('[Orbs Info] Loading Plugins!'.bold)
let plugins = plugin.load(express);
// plugins[0] = Plugin List (Name of all plugins);
// plugins[1] = Plugin Code (Object, by name);
// plugins[2] = Game Plugins (Load in game engine)


let GAME = game.init(plugins[2], express)
console.log('Type "help" to see a list of commands'.bold.green);
console.log('Checking Version...'.bold)
console.log('')
let contactedServer = false;
request('http://72.223.112.19:6000/check/' + version, (error, response, body) => {
    if (error){
        contactedServer = true;
        console.log(('Error on contacting version server. ' + error).bold.red);
    }else {
        let dat = JSON.parse(body);
        if (dat){
            contactedServer = true;
            if (dat.ok){
                console.log(('Version is ok. Current Version : ' + version).bold.green);
                console.log('')
            }else if (dat.bad){
                console.log(('Version is not updated. Current Version : ' + version + '  | Update Version : ' + dat.currentVersion).bold.red)
                console.log('')
            }
        }
    }
});
setTimeout(() => {
    if (!contactedServer){
        console.log('Version Checking Server Could Not Be Reached.'.bold.red);
        console.log('')
    }
}, 2000)
rl.on('line', (input) => {
  if (input){
      let re = commands(input, GAME, plugins);
      if (re){
          console.log(re)
      }
  }
});

// listen
app.listen(800)
