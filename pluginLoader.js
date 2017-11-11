const fs = require('fs');
const ini = require('ini');

exports.load = function(express){
    // Load all plugins in folder.
    let pluginlist = [];
    let plugins = {};
    fs.readdirSync('./Plugins').forEach(file => {
        let stats = fs.statSync(__dirname + '/Plugins/' + file)
        if (stats.isDirectory()){
            pluginlist[pluginlist.length] = file;
            console.log(String('[Game Info] Loading Plugin ' + file).bold)
            plugins[file] = require(__dirname + '/Plugins/' + file + '/plugin.js');
            let settings = ini.parse(fs.readFileSync(__dirname + '/Plugins/' + file + '/settings.ini', 'utf-8'))
            plugins[file].load(settings, express);
        }
    });
}
