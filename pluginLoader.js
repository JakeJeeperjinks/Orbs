const fs = require('fs');
const ini = require(__dirname + '/node_modules/ini/ini.js');

exports.load = function(express){
    // Load all plugins in folder.
    let pluginlist = [];
    let plugins = {};
    let gamePlugins = {};
    fs.readdirSync('./Plugins').forEach(file => {
        let stats = fs.statSync(__dirname + '/Plugins/' + file)
        if (stats.isDirectory()){
            pluginlist[pluginlist.length] = file;
            console.log(String('[Game Info] Loading Plugin ' + file).bold)
            plugins[file] = require(__dirname + '/Plugins/' + file + '/plugin.js');
            let settings = ini.parse(fs.readFileSync(__dirname + '/Plugins/' + file + '/settings.ini', 'utf-8'))
            plugins[file].load(settings, express);
            if (plugins[file].gamePlugin){
                gamePlugins[file] = plugins[file];
            }
        }
    });
    return [pluginlist, plugins, gamePlugins]
}
