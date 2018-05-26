// Add plugin integreation
module.exports = (data, game, plugins) => {
    let arguments = data.split(' ');
    if (arguments) {
        let cmd = arguments[0];
        arguments.splice(0, 1);
        let args = arguments;

        if (cmd == 'help'){
            return 'Commands :\nhelp | Shows list of commands!\nplugins | Shows list of plugins\nplugins help [plugin] | Executes plugin help command if any.\nplayer-list | Returns list of all players and their ids, names, and mass\nplayer | [info | change] [player id] [Change -> property (mass, name) ] [Change -> value]\n'.bold
        }else if (cmd == 'player') {
          if (args.length > 1) {
            if (args[0] == 'info'){
              let players = game.getPlayers();
              if (players[args[1]]){
                let cP = players[args[1]];
                console.log('Id : ' + args[1] + '  |  ' + 'Name : ' + cP.name + '  |  ' + 'Mass : ' + cP.blob.mass);
                return '\n';
              }else {
                return 'Error no player exists with that id! Try Command : player-list ; to see ids. \n'
              }
            }else if (args[0] == 'change'){
              let players = game.getPlayers();
              if (players[args[1]]){
                let cP = players[args[1]];
                if ((typeof args[2] !== 'undefined') && (typeof args[3] !== 'undefined')){
                  if (args[2] == 'mass'){
                    let worked = game.changePlayer(args[1], 'mass', args[3]);
                    if (worked){
                      console.log('Successfully Changed!')
                      return '\n';
                    }else {
                      console.log('Something went wrong :(');
                      return '\n';
                    }
                  }else if (args[2] == 'name'){
                    let worked = game.changePlayer(args[1], 'name', args[3]);
                    if (worked){
                      console.log('Successfully Changed!')
                      return '\n';
                    }else {
                      console.log('Something went wrong :(');
                      return '\n';
                    }
                  }
                }else {
                  return 'Error no property and value argument provided. Cmd Structure : player [info | change] [player id] [Change -> property (mass, name) ] [Change -> value]'
                }
              }else {
                return 'Error no player exists with that id! Try Command : player-list ; to see ids.'
              }
            }
          }else {
            return 'Not enough args! Cmd Structure : player [info | change] [player id] [Change -> property (mass, name) ] [Change -> value]'
          }
        }else if (cmd == 'player-list') {
          let players = game.getPlayers();
          let list = Object.entries(players);
          if (list.length == 0){
            return 'No players in game!'
          }
          for (i=0; i < list.length; i++){
            let cP = list[i];
            console.log('Id : ' + cP[0] + '  |  ' + 'Name : ' + cP[1].name + '  |  ' + 'Mass : ' + cP[1].blob.mass)
          }
          console.log(' -= END =- ')
          return ''
        }else if (cmd == 'plugins') {
            if (args.length > 0){
                if (args[0] == 'help'){
                    if (args[1]){
                        if (plugins[1][args[1]]){
                            let PLUGIN = plugins[1][args[1]];
                            if (PLUGIN.commands){
                                if (PLUGIN.commands[0]){
                                    if (PLUGIN.commands[0].commandType){
                                        if (PLUGIN.commands[0].commandType == 'help'){
                                            if (PLUGIN.commands[0].command){
                                                let RE = PLUGIN.commands[0].command();
                                                if (RE){
                                                    return RE
                                                }else {
                                                    return "Plugin's help command did not return an output. Please Contact Plugin Dev."
                                                }
                                            }else {
                                                return ('Plugin ' + args[1] + ' dose not have a command attribute. Please Contact Plugin Dev.').bold
                                            }
                                        }else {
                                            return ('Plugin ' + args[1] + "'s 1st command is not a help command.'").bold
                                        }
                                    }else {
                                        return ('Plugin ' + args[1] + ' dose not have a commandType attribute. Please Contact Plugin Dev.').bold
                                    }
                                }else {
                                    return ('Plugin ' + args[1] + ' dose not have commands.').bold
                                }
                            }else {
                                return ('Plugin ' + args[1] + ' dose not have commands.').bold
                            }
                        }else {
                            return 'Invalid Plugin name. Type "plugins" to get a list of plugins. \n'.bold
                        }
                    }else {
                        return 'Use "plugins help [plugin-name]" to get help of plugin. \n'.bold
                    }
                }
            }else {
                let STR = '';
                for (let i=0; i<plugins[0].length; i++){
                    STR += '\n' + plugins[0][i];
                }
                return ('Plugin List : ' + STR + '\n').bold
            }
        }else {
            let PLUGIN = false;
            let RETURN;
            for (let i=0; i<plugins[0].length; i++){
                let P = plugins[1][plugins[0][i]];
                if (P.commands){
                    for (let j=0; j< P.commands.length; j++){
                        if(P.commands[j].commandType){
                            if (P.commands[j].commandType == 'command'){
                                if (P.commands[j].name){
                                    if (P.commands[j].name == cmd){
                                        if (P.commands[j].command){
                                            RETURN = P.commands[j].command(args);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
            if (RETURN){
                return RETURN
            }else {
                return 'No command found. Type help to see list of available commands. \n'.bold
            }
        }
    }
}
